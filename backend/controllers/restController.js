const sqlite3 = require('better-sqlite3')
const db = sqlite3('../cat-forum.db');

const getUsers = async (req, res) =>{
   let statement = db.prepare(/*sql*/ `SELECT * FROM users`);

   res.json(statement.all());
}

const getSubjects = async (req, res) => {
   let statement = db.prepare(/*sql*/`
   SELECT * FROM subjects`)
   res.json(statement.all())
}

const getThreads = async (req, res) =>{
   let statement = db.prepare(/*sql*/`
   SELECT threads.* FROM threads, subjects WHERE threads.subjectId = $subjectId AND subjects.id = $subjectId
   `)

   res.json(statement.all({subjectId : req.params.subjectId }))
}

const getReplies = async (req, res) =>{
   let statement = db.prepare(/*sql*/ `
   SELECT replies.* FROM replies, threads WHERE replies.threadId = $threadId AND threads.id = $threadId `)

   res.json(statement.all({threadId : req.params.threadId}))
};

const createThread = async (req, res) =>{
   console.log('In create thread');
   let statement = db.prepare(/*sql*/`
   INSERT into threads (title, subjectId, creator) VALUES ($title, $subjectId, $creator)`)

   res.json(statement.run({table : 'threads', title: req.body.title, subjectId: req.params.subjectId, creator: 'AnnaBanana'}))
}

const createReply = async (req, res) =>{
   console.log('In create reply');
   let statement = db.prepare(/*sql*/`INSERT INTO replies (message, threadId, timestamp, sender) VALUES ($message, $threadId, $timestamp, $sender)
   `)

   res.json(statement.run({table: 'replies', 
message: req.body.message,
threadId: req.params.threadId,
timestamp: Date.now(),
sender: 'Bert Fjert'}))
}


module.exports = {
  getUsers,
  getSubjects,
  getThreads,
  getReplies,
  createThread,
  createReply
};