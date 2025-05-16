const express = require("express");
const router = express.Router();
const db = require("./db");

// Add expense
router.post("/add-expense", (req, res) => {
  const { title, amount, category, date } = req.body;
  const query = "INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)";
  db.query(query, [title, amount, category, date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Expense added!");
  });
});

// Get all expenses
router.get("/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
