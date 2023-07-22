const express = require("express");
const cors = require("cors");
const textRoutes = require("./routes/textRoutes");
const { createPool } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", textRoutes);

const setupDatabase = async () => {
  const pool = await createPool();

  await pool.query("CREATE DATABASE IF NOT EXISTS message");
  await pool.query("USE message");
  await pool.query("CREATE TABLE IF NOT EXISTS text (text VARCHAR(255))");
};

setupDatabase()
  .then(() => {
    app.listen(8080, () => console.log("Server running on port 8080"));
  })
  .catch((error) => {
    console.error("Failed to setup database", error);
    process.exit(1);
  });
