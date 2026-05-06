const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Synchronize database
db.sequelize.sync({ force: false }) // Change to true if you want to reset the DB on each restart
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Expense Sharing API." });
});

// Load routes
require("./routes/api.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
