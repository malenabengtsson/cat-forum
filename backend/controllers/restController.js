const sqlite3 = require("better-sqlite3");
const db = sqlite3("../cat-forum.db");
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant("basic")
  .createOwn("thread")
  .readAny("thread")
  .updateOwn("user")
  .grant("moderator")
  .extend("basic")
  .updateAny("thread")
  .grant("admin")
  .extend("moderator")
  .updateAny("user")
  .deleteAny("user")
  .deleteAny("thread");

const getSubjects = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
   SELECT * FROM subjects`);
  res.json(statement.all());
};

const getThreads = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
   SELECT threads.* FROM threads, subjects WHERE threads.subjectId = $subjectId AND subjects.id = $subjectId
   `);

  res.json(statement.all({ subjectId: req.params.subjectId }));
};

const getReplies = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
   SELECT replies.* FROM replies, threads WHERE replies.threadId = $threadId AND threads.id = $threadId `);

  res.json(statement.all({ threadId: req.params.threadId }));
};

const createThread = async (req, res) => {
  const permission = ac.can(req.session.user.userRole).createOwn("thread");
  console.log("In create thread");
  if (permission.granted) {
    let statement = db.prepare(/*sql*/ `
   INSERT into threads (title, subjectId, creator) VALUES ($title, $subjectId, $creator)`);

    res.json(
      statement.run({
        title: req.body.title,
        subjectId: req.params.subjectId,
        creator: req.body.creator,
      })
    );
  } else {
    console.log("Permission not granted");
  }
};
const createReply = async (req, res) => {
  console.log("In create reply");
  const permission = ac.can(req.session.user.userRole).createOwn("thread");
  if (permission.granted) {
    let statement = db.prepare(/*sql*/ `INSERT INTO replies (message, threadId, timestamp, sender) VALUES ($message, $threadId, $timestamp, $sender)
   `);

    res.json(
      statement.run({
        message: req.body.message,
        threadId: req.params.threadId,
        timestamp: Date.now(),
        sender: req.body.sender,
      })
    );
  }
};

module.exports = {
  getSubjects,
  getThreads,
  getReplies,
  createThread,
  createReply,
};
