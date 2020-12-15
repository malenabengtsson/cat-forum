const sqlite3 = require('better-sqlite3');

const getUsers = async (req, res) =>{
   let statement = await db.prepare(/*sql*/ `SELECT * FROM Dietary_Restrictions`);
   let result = statement.all()
   res.json(result);
}