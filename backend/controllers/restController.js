const sqlite3 = require("better-sqlite3");
const db = sqlite3("../cat-forum.db");
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant("null")
  .readAny("thread")
  .readAny("user")
  .grant("basic")
  .extend("null")
  .createOwn("thread")
  .createOwn('reply')
  .grant("moderator")
  .extend("basic")
  .updateAny("thread")
  .deleteAny("replyIfModerator")
  .grant("admin")
  .extend("moderator")
  .updateAny("user")
  .deleteAny("user")

const getSubjects = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
   SELECT * FROM subjects`);
  res.json(statement.all());
};
const getAllThreads = async (req, res) =>{
  let statement = db.prepare(
    /*sql*/ `SELECT * FROM threads`
  );
  res.json(statement.all())
}
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

const getUserByUsername = async(req, res) =>{
  let permission;
  if(req.session.user){
   permission = ac.can(req.session.user.userRole).readAny("user");
  }
  else{
    permission = ac.can('null').readAny('user');
  }

 if(permission.granted){
   let statement = db.prepare(/*sql*/ `
         SELECT u.id, u.email, u.username, r.userRole FROM users as u, roles as r
         WHERE u.username = $username AND r.id = u.roleId
      `);
   let user = statement.get({username: req.params.username}) || null;
   if (user) {
     delete user.password;
   }
   res.json(user)
 }
 else{
   res.status(403).json({ error: "Not authorized to access" });
 }
}
const createThread = async (req, res) => {
  const permission = ac.can(req.session.user.userRole).createOwn("thread");
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
    res.status(403).json({ error: "Not authorized to access" });
  }
};
const createReply = async (req, res) => {
  const permission = ac.can(req.session.user.userRole).createOwn("thread");
  if (permission.granted) {
    let statement = db.prepare(/*sql*/ `INSERT INTO replies (message, threadId, timestamp, sender, warning) VALUES ($message, $threadId, $timestamp, $sender, $warning)
   `);

    res.json(
      statement.run({
        message: req.body.message,
        threadId: req.params.threadId,
        timestamp: Date.now(),
        sender: req.body.sender,
        warning: req.body.warning
      })
    );
  }
  else{
    res.status(403).json({ error: "Not authorized to access" });
  }
};

const deleteReply = async (req, res) =>{
  const permission = ac.can(req.session.user.userRole).deleteAny('replyIfModerator');
  if(permission.granted){
    let statement = db.prepare(/*sql*/ `
    DELETE FROM replies WHERE id = $replyId`)
  
    res.json(statement.run({replyId: req.params.replyId}))
  }
  else{
    res.status(403).json({ error: "Not authorized to access" });
  }
}

const deleteUser = (req, res) =>{
const permission = ac.can(req.session.user.userRole).deleteAny('user');

if(permission.granted){
  let deleteStatement = db.prepare(/*sql*/`DELETE FROM users WHERE id=$userId`)
  let deleteModeratorConnections = db.prepare(
    /*sql*/ `DELETE FROM threadsXmoderatorUsers WHERE userId = $userId`
  );
  deleteModeratorConnections.run({userId: parseInt(req.params.userId)})
  res.json(deleteStatement.run({ userId: parseInt(req.params.userId) }));
 }
 else{
   res.status(403).json({ error: "Not authorized to access" });
 }
}

const lockThread = async (req, res) =>{
  const permission = ac.can(req.session.user.userRole).updateAny("thread");
if(permission.granted){
  let statement = db.prepare(/*sql*/`
  UPDATE threads SET locked = 1 WHERE id = $threadId`)
  res.json(statement.run({threadId : req.params.threadId}))
} else{
  res.status(403).json({ error: "Not authorized to access" });
}
}

const getAllThreadsIfUserIsModerator = async (req, res) => {
  let statement = db.prepare(
    /*sql*/ `SELECT t.* FROM threadsXmoderatorUsers as tXm, threads as t WHERE tXm.userId = $userId AND tXm.threadId = t.id`
  );
  let result = statement.all({userId: parseInt(req.params.userId)})  
  res.json(result);
}

const checkIfUserIsModerator =  (userId) => {
  let statement = db.prepare(/*sql*/ `
  SELECT * FROM threadsXmoderatorUsers as tXm, threads as t WHERE tXm.userId = $userId AND tXm.threadId = t.id`);
  let result = statement.all({userId: userId});
  if (result.length > 0){
    return true;
  }
  else{
    return false;
  }
};

const demoteToBasicUser = (userId) => {
    let statement = db.prepare(/*sql*/`UPDATE users SET roleId = 1 WHERE id 
    = $userId`);
    statement.run({userId: userId})
  }

const promoteToModeratorRole = (userId) =>{
 
 let statement = db.prepare(/*sql*/ `UPDATE users SET roleId = 2 WHERE id 
  = $userId`);
 statement.run({userId: userId});
}
 


const promoteToModerator = async (req, res) => {
   const permission = ac
     .can(req.session.user.userRole)
     .updateAny("user");

     if(permission.granted){
         let check = checkIfUserIsModerator(parseInt(req.params.userId));
         if(!check){
           promoteToModeratorRole(parseInt(req.params.userId));
         }
          let statement = db.prepare(/*sql*/ `
       INSERT into threadsXmoderatorUsers (threadId, userId) VALUES ($threadId, $userId) `)
       res.json(
         statement.run({
           threadId: parseInt(req.params.threadId),
           userId: parseInt(req.params.userId),
         })
       );
       }
       else{
         res.status(403).json({ error: "Not authorized to access" });
       }
     }


const removeModeratorFromThread = async (req, res) => {
   const permission = ac.can(req.session.user.userRole)
     .updateAny("user");

     if(permission.granted){
       let statement = db.prepare(
         /*sql*/ `DELETE FROM threadsXmoderatorUsers WHERE userId = $userId AND threadId = $threadId`
       );
       let result = statement.run({
         userId: parseInt(req.params.userId),
         threadId: parseInt(req.params.threadId),
       });
     
       let check = checkIfUserIsModerator(
         parseInt(req.params.userId)
       );
       if(!check){
         demoteToBasicUser(parseInt(req.params.userId))
       }
       res.json(result)
       
     }
     else{
       res.status(403).json({ error: "Not authorized to access" });
     }
}

module.exports = {
  getSubjects,
  getThreads,
  getAllThreads,
  getReplies,
  getUserByUsername,
  getAllThreadsIfUserIsModerator,
  createThread,
  createReply,
  promoteToModerator,
  removeModeratorFromThread,
  lockThread,
  deleteReply,
  deleteUser,
};
