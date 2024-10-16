const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Endpoint para crear un usuario
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
