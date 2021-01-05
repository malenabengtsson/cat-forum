const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('/subjects', restController.getSubjects)
router.get("/threads", restController.getAllThreads);
router.get('/threads/:subjectId', restController.getThreads)
router.get('/replies/:threadId', restController.getReplies),
router.post('/threads/:subjectId', restController.createThread)
router.post('/replies/:threadId', restController.createReply)
router.get('/:username', restController.getUserByUsername)
router.get('/moderator/:userId', restController.getAllThreadsIfUserIsModerator)
router.get("/removeModerator/:userId/:threadId", restController.removeModeratorFromThread);
router.get("/addModerator/:userId/:threadId", restController.promoteToModerator);
router.get("/lockThread/:threadId", restController.lockThread)
router.get('/deleteReply/:replyId', restController.deleteReply)
router.get('/deleteUser/:userId', restController.deleteUser)


module.exports = router;