const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('/users', restController.getUsers)
router.get('/subjects', restController.getSubjects)
router.get('/threads/:subjectId', restController.getThreads)
router.get('/replies/:threadId', restController.getReplies),
router.post('/threads/:subjectId', restController.createThread)
router.post('/replies/:threadId', restController.createReply)


module.exports = router;