module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const expenses = require("../controllers/expense.controller.js");

  var router = require("express").Router();

  // Users
  router.post("/users", users.create);
  router.get("/users", users.findAll);
  router.get("/users/:id", users.findOne);
  router.get("/balances", users.getGlobalBalances);

  // Expenses
  router.post("/expenses", expenses.create);
  router.get("/expenses", expenses.findAll);
  router.get("/expenses/:id", expenses.findOne);

  app.use('/api', router);
};
