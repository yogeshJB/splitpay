module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define("expense", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    payerId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    splitType: {
      type: Sequelize.ENUM('EQUAL', 'EXACT', 'PERCENT'),
      allowNull: false
    }
  });

  return Expense;
};
