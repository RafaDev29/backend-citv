const multer = require('multer');
const storage = multer.memoryStorage(); // Cargar en memoria en lugar de guardarlo en disco
const upload = multer({ storage: storage });

const express = require('express');
const router = express.Router();
const evidenceController = require('./evidence.controller');

// Ruta POST para crear evidencia con archivos
router.post('/create', upload.array('file', 10), evidenceController.createEvidence);
router.get('/list', evidenceController.listEvidenceGrouped);
module.exports = router;
