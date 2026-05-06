const db = require("../models");
const User = db.users;
const Expense = db.expenses;
const ExpenseShare = db.expenseShares;
const { Op } = require("sequelize");

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.mobile) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile
    };

    const data = await User.create(user);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Fetch user's expenses (where they paid)
    const paidExpenses = await Expense.findAll({
      where: { payerId: id },
      include: [{ model: ExpenseShare }]
    });

    // Fetch user's shares (where they owe)
    const sharedExpenses = await ExpenseShare.findAll({
      where: { userId: id },
      include: [{ model: Expense, include: [{ model: User, as: "payer" }] }]
    });

    // Calculate balances with other users
    const balances = {}; // { userId: balance } positive means they owe this user, negative means this user owes them

    // If user paid, others owe them (positive balance for user)
    for (const exp of paidExpenses) {
      for (const share of exp.expense_shares) {
        if (share.userId !== id) {
          balances[share.userId] = (balances[share.userId] || 0) + parseFloat(share.shareAmount);
        }
      }
    }

    // If user shared, they owe others (negative balance for user)
    for (const share of sharedExpenses) {
      if (share.expense.payerId !== id) {
        balances[share.expense.payerId] = (balances[share.expense.payerId] || 0) - parseFloat(share.shareAmount);
      }
    }

    const balanceList = [];
    for (const [otherId, amount] of Object.entries(balances)) {
      if (Math.abs(amount) > 0.001) {
        const otherUser = await User.findByPk(otherId);
        balanceList.push({
          userId: otherId,
          userName: otherUser ? otherUser.name : "Unknown",
          amount: parseFloat(amount.toFixed(2))
        });
      }
    }

    res.send({
      user,
      paidExpenses,
      sharedExpenses,
      balances: balanceList
    });
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};

// Global balances for everyone
exports.getGlobalBalances = async (req, res) => {
  try {
    const users = await User.findAll();
    const shares = await ExpenseShare.findAll({
      include: [{ model: Expense }]
    });

    // matrix[userA][userB] = net amount userB owes userA
    const matrix = {};
    users.forEach(u1 => {
      matrix[u1.id] = {};
      users.forEach(u2 => {
        if (u1.id !== u2.id) matrix[u1.id][u2.id] = 0;
      });
    });

    for (const share of shares) {
      const payerId = share.expense.payerId;
      const sharerId = share.userId;
      if (payerId !== sharerId) {
        matrix[payerId][sharerId] += parseFloat(share.shareAmount);
      }
    }

    const results = [];
    for (const payerId of Object.keys(matrix)) {
      const payer = users.find(u => u.id === payerId);
      for (const sharerId of Object.keys(matrix[payerId])) {
        const amount = matrix[payerId][sharerId];
        const sharer = users.find(u => u.id === sharerId);
        
        // Simplify: if A owes B 100 and B owes A 40, then A owes B 60.
        // We only show one direction if amount > 0
        if (amount > matrix[sharerId][payerId]) {
            const net = amount - matrix[sharerId][payerId];
            if (net > 0.001) {
                results.push({
                    payer: payer.name,
                    sharer: sharer.name,
                    amount: parseFloat(net.toFixed(2))
                });
            }
        }
      }
    }

    res.send(results);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
