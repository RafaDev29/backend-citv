const express = require('express');
const router = express.Router();
const platesController = require('./plates.controller');

// Ruta POST para crear un nuevo registro en plates
router.post('/', platesController.createPlate);
router.get('/', platesController.listActivePlates);
module.exports = router;
