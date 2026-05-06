module.exports = (sequelize, Sequelize) => {
  const ExpenseShare = sequelize.define("expense_share", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    expenseId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    shareAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return ExpenseShare;
};
