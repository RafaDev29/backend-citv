// src/modules/visits/visits.routes.js
const express = require('express');
const router = express.Router();
const platesController = require('./plate.controller');


router.get('/list', platesController.listPlates);

module.exports = router;
