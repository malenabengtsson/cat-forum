const sqlite3 = require("better-sqlite3");
const db = sqlite3("../cat-forum.db");
const Encrypt = require("../Security/Encrypt");

const register = async (req, res) => {
  if (req.body && req.body.email.includes("@")) {
    if(req.body.roleId === 1){
let uniqueEmail = checkIfEmailIsUnique(req.body.email);
let uniqueUsername = checkIfUsernameIsUnique(req.body.username);

if (uniqueEmail === true && uniqueUsername === true) {
  if (req.body.password) {
    req.body.password = Encrypt.multiEncrypt(req.body.password);
  }
  let statement = db.prepare(/*sql*/ `
      INSERT INTO users (email, username, password, roleId) values ($email, $username, $password, $roleId)`);
  try {
    res.json(statement.run(req.body));
  } catch {
    res.status(400).json({ error: "Something went wrong" });
  }
} else {
  if (uniqueEmail === true && uniqueUsername === false) {
    res.status(400).json({ error: "username" });
  } else if (uniqueEmail === false && uniqueUsername === true) {
    res.status(400).json({ error: "email" });
  } else {
    res.status(400).json({ error: "username email" });
  }
}
    }
    else{
      res.status(403).json({error: "You can only create a user with id 1"})
    }
  } else {
    res.status(400).json({ error: "Not a valid email-address" });
  }
};

const login = async (req, res) => {
  if (req.body.password) {
    req.body.password = Encrypt.multiEncrypt(req.body.password);
  }
  let statement = db.prepare(/*sql*/ `
         SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
         WHERE u.email = $email AND u.password = $password AND r.id = u.roleId
      `);
  let user;
  try {
    user = statement.get(req.body) || null;
  } catch {
    res.status(400).json({ error: "Something went wrong" });
  }
  if (user) {
    delete user.password;
    // store the logged in user in a session
    req.session.user = user;
  }
  res.json(user);
};

const whoami = async (req, res) => {
  res.json(req.session.user || null);
};

const checkIfEmailIsUnique = (email) => {
  let statement = db.prepare(
    /*sql*/ `SELECT * FROM users WHERE email = $email`
  );
  result = statement.all({ email: email });
  if (result.length > 0) {
    return false;
  } else {
    return true;
  }
};

const checkIfUsernameIsUnique = (username) => {
  let statement = db.prepare(
    /*sql*/ `SELECT * FROM users WHERE username = $username`
  );
  result = statement.all({ username: username });
  if (result.length > 0) {
    return false;
  } else {
    return true;
  }
};

const logout = async (req, res) => {
  delete req.session.user;
  res.json({ loggedOut: true });
};

module.exports = {
  register,
  login,
  whoami,
  logout,
};
