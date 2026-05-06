const db = require("../models");
const Expense = db.expenses;
const ExpenseShare = db.expenseShares;
const User = db.users;

exports.create = async (req, res) => {
  const { description, amount, payerId, splitType, shares } = req.body;

  if (!description || !amount || !payerId || !splitType || !shares || !Array.isArray(shares)) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  const totalAmount = parseFloat(amount);
  const numSharers = shares.length;
  let calculatedShares = [];

  try {
    if (splitType === 'EQUAL') {
      const sharePerPerson = Math.floor((totalAmount / numSharers) * 100) / 100;
      let sumOtherShares = sharePerPerson * (numSharers - 1);
      const firstPersonShare = parseFloat((totalAmount - sumOtherShares).toFixed(2));
      
      calculatedShares = shares.map((s, index) => ({
        userId: s.userId,
        amount: index === 0 ? firstPersonShare : sharePerPerson
      }));
    } 
    else if (splitType === 'EXACT') {
      let sum = 0;
      shares.forEach(s => sum += parseFloat(s.amount));
      if (Math.abs(sum - totalAmount) > 0.01) {
        return res.status(400).send({ message: `Sum of shares (${sum}) must equal total amount (${totalAmount})` });
      }
      calculatedShares = shares.map(s => ({
        userId: s.userId,
        amount: parseFloat(parseFloat(s.amount).toFixed(2))
      }));
    } 
    else if (splitType === 'PERCENT') {
      let sumPercent = 0;
      shares.forEach(s => sumPercent += parseFloat(s.percent));
      if (Math.abs(sumPercent - 100) > 0.01) {
        return res.status(400).send({ message: "Total percentage must be 100" });
      }

      let totalCalculated = 0;
      const tempShares = shares.map((s, index) => {
        const amt = Math.floor((totalAmount * (parseFloat(s.percent) / 100)) * 100) / 100;
        if (index > 0) totalCalculated += amt;
        return { userId: s.userId, amount: amt };
      });

      tempShares[0].amount = parseFloat((totalAmount - totalCalculated).toFixed(2));
      calculatedShares = tempShares;
    }

    // Save Expense
    const expense = await Expense.create({
      description,
      amount: totalAmount,
      payerId,
      splitType
    });

    // Save Shares
    const sharePromises = calculatedShares.map(s => {
      return ExpenseShare.create({
        expenseId: expense.id,
        userId: s.userId,
        shareAmount: s.amount
      });
    });

    await Promise.all(sharePromises);

    res.send({ message: "Expense added successfully", expenseId: expense.id });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error adding expense" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Expense.findAll({
      include: [
        { model: User, as: "payer", attributes: ["name", "email"] },
        { model: ExpenseShare, include: [{ model: User, attributes: ["name"] }] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Expense.findByPk(req.params.id, {
      include: [
        { model: User, as: "payer", attributes: ["name", "email"] },
        { model: ExpenseShare, include: [{ model: User, attributes: ["name"] }] }
      ]
    });
    if (!data) return res.status(404).send({ message: "Expense not found" });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
