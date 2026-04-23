const express = require("express");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EventMesh API running 🚀");
});

app.post("/users", async (req, res) => {
  try {
    const { first_name, last_name, email, password_hash } = req.body;

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [first_name, last_name, email, password_hash],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
