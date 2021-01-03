const sqlite3 = require("better-sqlite3");
const db = sqlite3("../cat-forum.db");
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac.grant('null').readAny('thread').readAny('user')
.grant("basic")
.extend('null')
  .createOwn("thread")
  .readAny('user')
  .updateOwn("user")
  .updateOwn('thread')
  .grant("moderator")
  .extend("basic")
  .updateAny("thread")
  .updateAny('user')
  .deleteAny('replyIfModerator')
  .grant("admin")
  .extend("moderator")
  .updateAny('userOrModerator')
  .deleteAny("user")
  .deleteAny("thread");

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
    console.log("Permission not granted");
  }
};
const createReply = async (req, res) => {
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

const getAllThreadsIfUserIsModerator = async (req, res) =>{

  let query = `SELECT t.* FROM threadsXmoderatorUsers as tXm, threads as t WHERE tXm.userId = ${parseInt(req.params.userId)} AND tXm.threadId = t.id`;
  let statement = db.prepare(query)
  let chosen = statement.all()  
  res.json(chosen);
}

const checkIfUserIsModerator =  (userId) => {
  let query = `
  SELECT * FROM threadsXmoderatorUsers as tXm, threads as t WHERE tXm.userId = ${userId} AND tXm.threadId = t.id`;
  let statement = db.prepare(/*sql*/ query);
  let result = statement.all();

 console.log(result.length);
  if (result.length > 0){
    return true;
  }
  else{
    console.log('empty');
    return false;
  }
};

const demoteToBasicUser = (userId) => {
  console.log('In demote ');
  let statement = db.prepare(/*sql*/`UPDATE users SET roleId = 1 WHERE id 
  = ${userId}`);
  statement.run()

}

const promoteToModeratorRole = (userId) =>{
console.log('in promote');
 let statement = db.prepare(/*sql*/ `UPDATE users SET roleId = 2 WHERE id 
  = ${userId}`);
 statement.run();

}


const promoteToModerator = async (req, res) => {
   const permission = ac
     .can(req.session.user.userRole)
     .updateAny("userOrModerator");

     if(permission.granted){
         console.log('Make moderator');
         let check = checkIfUserIsModerator(parseInt(req.params.userId));
         console.log(check);
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
     }


const removeModeratorFromThread = async (req, res) => {
  console.log(req.session.user);
   const permission = ac.can(req.session.user.userRole)
     .updateAny("userOrModerator");

     console.log(permission.granted);
     if(permission.granted){
       let query = `DELETE FROM threadsXmoderatorUsers WHERE userId = ${parseInt(
         req.params.userId
       )} AND threadId = ${parseInt(req.params.threadId)}`;
       let statement = db.prepare(query);
       let result = statement.run();
     
       let check = checkIfUserIsModerator(
         parseInt(req.params.userId)
       );
       if(!check){
         demoteToBasicUser(parseInt(req.params.userId))
       }
       res.json(result)
       
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
};
