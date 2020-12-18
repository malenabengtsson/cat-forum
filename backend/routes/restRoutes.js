const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('/users', restController.getUsers)
router.get('/subjects', restController.getSubjects)
router.get('/threads/:subjectId', restController.getThreads)

module.exports = router;