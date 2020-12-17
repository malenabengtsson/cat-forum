const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('/users', restController.getUsers)

module.exports = router;