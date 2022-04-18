const user_db = require("../database/database_user");

const md5 = require("md5");

const newUser = (req, res) => {
  let salt = md5(Math.random());
  let user_info = {
    email: req.body.email,
    user_n: req.body.username,
    pass: md5(req.body.password + String(salt)),
    salt: salt,
  };
  try {
    const stmt = user_db.prepare(
      "INSERT INTO user (email, username, password, salt) VALUES(?,?,?,?)"
    );
    const info = stmt.run(
      user_info.email,
      user_info.user_n,
      user_info.pass,
      user_info.salt
    );
    res.status(200).json(info);
  } catch (e) {
    console.error(e);
  }
};

const userExists = (req, res) => {
  try {
    const stmt = user_db.prepare("SELECT * FROM user").all();
    res.status(200).json(stmt);
  } catch (e) {
    console.error(e);
  }
};

const userSignin = (req, res) => {
  try {
    let sign_in = false;
    let user_data = {
      user: req.body.username,
      pass: req.body.password,
    };
    const stmt = user_db
      .prepare("SELECT * FROM user WHERE username = ?")
      .get(user_data.user);
    if (stmt != undefined && stmt.password == String(md5(user_data.pass + stmt.salt))) {
      sign_in = true;
      res.status(200).json({ token: sign_in, user: user_data.user });
    }
    else{
      res.status(401).json({ token: sign_in })
    }
  } catch (e) {
    console.error(e);
  }
};

const updateUser = (req, res) => {
  try {
    let salt = null;
    if (!(req.body.password === undefined)) {
      salt = md5(Math.random());
    }
    let user_info = {
      user: req.body.newusername,
      pass: md5(req.body.password + String(salt)),
      email: req.body.email,
      salt: salt,
    };
    const stmt =
      user_db.prepare(`UPDATE user SET username = COALESCE(?,username),
            email = COALESCE(?,email),password = COALESCE(?,password),  
            salt = COALESCE(?, salt) WHERE username = ?`);
    const info = stmt.run(
      user_info.user,
      user_info.email,
      user_info.pass,
      user_info.salt,
      req.body.username
    );
    res.status(200).json(info);
  } catch (e) {
    console.error(e);
  }
};

const deleteUser = (req, res) => {
  try {
    const stmt = user_db.prepare("DELETE FROM user WHERE username = ?");
    const info = stmt.run(req.body.username);
    res.status(200).json(info);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { newUser, userExists, userSignin, updateUser, deleteUser };
