const sqlite3 = require('better-sqlite3')
const db = sqlite3('../cat-forum.db');


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

   res.json(statement.run({title: req.body.title, subjectId: req.params.subjectId, creator: req.body.creator}))}
const createReply = async (req, res) =>{
   console.log('In create reply');
   let statement = db.prepare(/*sql*/`INSERT INTO replies (message, threadId, timestamp, sender) VALUES ($message, $threadId, $timestamp, $sender)
   `)

   res.json(statement.run({ 
message: req.body.message,
threadId: req.params.threadId,
timestamp: Date.now(),
sender: req.body.sender}))
}

const getThreadByTitle = async (req, res) => {
   let statement = db.prepare(/*sql*/`SELECT threads.id FROM threads WHERE threads.title = $title`);
   
   res.json(statement.get({$title: req.body.title}))
}


module.exports = {
  getSubjects,
  getThreads,
  getReplies,
  createThread,
  createReply
};