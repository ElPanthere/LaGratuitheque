// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./database.db');

// Middleware to serve static files
app.use(express.static('public'));

// Route to fetch sites by category
app.get('/api/sites/:category', (req, res) => {
  const category = req.params.category;
  const sql = `SELECT * FROM Sites WHERE categorie = ?`;

  db.all(sql, [category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ sites: rows });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
