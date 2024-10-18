const express = require('express');
const router = express.Router();
const evidenceController = require('./evidence.controller');

// Importar multerConfig para gestionar la subida de archivos
const upload = require('../../utils/multerConfig');

// Ruta para crear una evidencia
router.post('/create', upload.array('images'), evidenceController.createEvidence);

module.exports = router;
