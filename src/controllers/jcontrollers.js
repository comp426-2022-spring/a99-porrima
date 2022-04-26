const user_db = require("../database/database_user");

const newEntry = (req, res) => {
  try {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    today = dd + "-" + mm + "-" + yyyy;

    const day = req.body.date || today;

    const check = user_db
      .prepare(
        "SELECT date, entry FROM journal WHERE date = ? and username = ?"
      )
      .get(day, req.body.username);

    //if (check === undefined) {
    const stmt = user_db.prepare(
      "INSERT INTO journal (date, username, entry) VALUES(?,?,?)"
    );
    //);
    const info = stmt.run(day, req.body.username, req.body.entry);
    res.status(200).json(info);
  } catch (e) {
    /*else {
      res
        .status(400)
        .json({ message: "Entry exists for this user on this day." });
    }*/
    console.error(e);
  }
};

const userEntries = (req, res) => {
  try {
    const stmt = user_db
      .prepare("SELECT date, entry FROM journal WHERE username = ?")
      .all(req.body.username);
    res.status(200).json(stmt);
  } catch (e) {
    console.error(e);
  }
};

const allEntries = (req, res) => {
  try {
    const stmt = user_db.prepare("SELECT * FROM journal").all();
    res.status(200).json(stmt);
  } catch (e) {
    console.error(e);
  }
};

const updateEntry = (req, res) => {
  try {
    const stmt = user_db.prepare(
      "UPDATE journal SET entry = ? WHERE username = ? and date = ?"
    );
    // Date must be in format: dd-mm-yyyy
    const info = stmt.run(req.body.entry, req.body.username, req.body.date);
    res.status(200).json(info);
  } catch (e) {
    console.error(e);
  }
};

const deleteEntry = (req, res) => {
  try {
    const stmt = user_db.prepare(
      "DELETE FROM journal WHERE username = ? and date = ?"
    );
    const info = stmt.run(req.body.username, req.body.date);
    res.status(200).json(info);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  newEntry,
  userEntries,
  allEntries,
  updateEntry,
  deleteEntry,
};
