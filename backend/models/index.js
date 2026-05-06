const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.expenses = require("./expense.model.js")(sequelize, Sequelize);
db.expenseShares = require("./expenseShare.model.js")(sequelize, Sequelize);

// Associations
db.expenses.belongsTo(db.users, { as: "payer", foreignKey: "payerId" });
db.users.hasMany(db.expenses, { as: "paidExpenses", foreignKey: "payerId" });

db.expenseShares.belongsTo(db.expenses, { foreignKey: "expenseId" });
db.expenses.hasMany(db.expenseShares, { foreignKey: "expenseId" });

db.expenseShares.belongsTo(db.users, { foreignKey: "userId" });
db.users.hasMany(db.expenseShares, { foreignKey: "userId" });

module.exports = db;
