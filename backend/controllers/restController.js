const DB = require("../DB");
const path = require("path");
const dbPath = path.join(__dirname, "../databases/foodStore.db");
const db = new DB(dbPath);

const getUsers = async (req, res) =>{
   let result = await db.all(/*sql*/ `SELECT * FROM users`);
   res.json(result);
}