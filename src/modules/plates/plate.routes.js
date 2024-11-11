const express = require('express');
const router = express.Router();
const platesController = require('./plate.controller');

// Ruta POST para crear un nuevo registro en plates
router.post('/create', platesController.createPlate);
router.get('/list', platesController.listActivePlates);
module.exports = router;
