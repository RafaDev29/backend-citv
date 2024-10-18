const multer = require('multer');

// Usar memoryStorage para almacenar los archivos en memoria temporalmente
const storage = multer.memoryStorage(); 

// Crear la instancia de multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de tamaño de archivo (5 MB)
});

module.exports = upload;
