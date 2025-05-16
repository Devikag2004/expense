const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./server/db'); // Already connected
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve static files (frontend) from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Route to serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Route to add a new expense
app.post('/expenses', (req, res) => {
  const { title, amount, category, date } = req.body;
  const sql = 'INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, amount, category, date], (err, result) => {
    if (err) {
      console.error('❌ Error inserting expense:', err);
      return res.status(500).json({ error: 'Failed to add expense' });
    }
    res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
  });
});

// ✅ Route to get all expenses
app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) {
      console.error('❌ Error fetching expenses:', err);
      return res.status(500).json({ error: 'Failed to fetch expenses' });
    }

    if (Array.isArray(results)) {
      console.log('✅ Expenses fetched from DB:', results);
    } else {
      console.warn('⚠️ Unexpected response format:', results);
    }

    res.json(results);
  });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
