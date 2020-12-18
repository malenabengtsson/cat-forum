const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('rest/users', restController.getUsers)
router.get('rest/subjects', restController.getSubjects)

module.exports = router;