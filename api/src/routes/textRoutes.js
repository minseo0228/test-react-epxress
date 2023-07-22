const express = require("express");
const router = express.Router();
const { createPool } = require("../db");

router.post("/api/send", async (req, res) => {
  const { text } = req.body;
  const pool = await createPool();

  try {
    const [rows, fields] = await pool.query(
      "INSERT INTO text (text) VALUES (?)",
      [text]
    );

    res.json({ message: "Text saved successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/api/load", async (req, res) => {
  const pool = await createPool();

  try {
    const [rows, fields] = await pool.query("SELECT * FROM text");

    const texts = rows.map((row) => row.text);
    res.json(texts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/api/delete", async (req, res) => {
  const { texts } = req.body;
  const pool = await createPool();

  try {
    await Promise.all(
      texts.map(async (text) => {
        await pool.query("DELETE FROM text WHERE text = ?", [text]);
      })
    );

    res.json({ message: "Selected texts deleted successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
