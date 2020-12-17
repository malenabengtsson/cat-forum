const sqlite3 = require('better-sqlite3')
const db = sqlite3('../cat-forum.db');

const getUsers = async (req, res) =>{
   let statement = db.prepare(/*sql*/ `SELECT * FROM users`);

   res.json(statement.all());
}

module.exports = {
   getUsers
}