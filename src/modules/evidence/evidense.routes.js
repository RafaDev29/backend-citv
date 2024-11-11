const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ruta donde se guardarán las imágenes temporalmente
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(file.originalname);
        cb(null, filename); // Nombre único para cada archivo
    }
});
const upload = multer({ storage: storage });

const express = require('express');
const router = express.Router();
const evidenceController = require('./evidence.controller');

// Ruta POST para crear evidencia con archivos
router.post('/create', upload.array('Foto', 10), evidenceController.createEvidence);

module.exports = router;
