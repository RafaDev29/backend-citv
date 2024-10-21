const express = require('express');
const router = express.Router();
const evidenceController = require('./evidence.controller');

// Importar multerConfig para gestionar la subida de archivos
const upload = require('../../utils/multerConfig');

// Ruta para crear una evidencia con múltiples imágenes (asegúrate que 'Foto64' sea el nombre correcto en Postman)
router.post('/create', upload.array('images'), evidenceController.createEvidence);
router.post('/convertBase64ToImage', evidenceController.convertBase64ToImage);


module.exports = router;
