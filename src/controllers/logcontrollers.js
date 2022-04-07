const log_db = require("../database/database_accesslogs");

const root = (req, res) => {
  res.status(200);
  res.json({ message: "API works (200)" });
};

const getLogs = (req, res) => {
  try {
    const stmt = log_db.prepare("SELECT * FROM accesslog").all();
    res.status(200).json(stmt);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { getLogs, root };
