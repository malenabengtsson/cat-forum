const sqlite3 = require("better-sqlite3");
const db = sqlite3("../cat-forum.db");
const Encrypt = require('../Security/Encrypt')
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const register = async (req, res) =>{
  console.log('In register');
  if(req.body.password){
    req.body.password = Encrypt.multiEncrypt(req.body.password)
  }
let statement = db.prepare(/*sql*/`
INSERT INTO users (email, username, password, roleId) values ($email, $username, $password, $roleId)`)
res.json(statement.run(req.body))
}

const login = async (req, res) =>{
  console.log('In login');
   if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = db.prepare(/*sql*/`
         SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
         WHERE u.email = $email AND u.password = $password AND r.id = u.roleId
      `);
      let user = statement.get(req.body) || null;
      if (user) {
        delete user.password;
        // store the logged in user in a session
        req.session.user = user;
      }
      console.log(user);
      res.json(user);
}

const whoami = async (req, res) =>{
  res.json(req.session.user || null)
}

const logout = async (req, res) =>{
  delete req.session.user;
  res.json({loggedOut: true})
}

module.exports = {
  register, 
login,
whoami, 
logout
};