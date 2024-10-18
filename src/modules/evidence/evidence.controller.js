const evidenceService = require('./evidence.service'); // Asegúrate de tener este require al principio

const createEvidence = async (req, res) => {
  try {
    // Verificar que hay archivos en la solicitud
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se ha proporcionado ningún archivo' });
    }

    // Convertir las imágenes a Base64
    const imagesBase64 = req.files.map(file => file.buffer.toString('base64'));

    // Construir el objeto de datos para insertar en la base de datos
    const evidenceData = {
      IdIngCou: req.body.IdIngCou,
      NumVez: req.body.NumVez,
      Item: req.body.Item,
      Detalle: req.body.Detalle,
      LogUsu: req.body.LogUsu,
      ChkCert: req.body.ChkCert,
      ID: req.body.ID,
      ChkCloud: req.body.ChkCloud,
      PathCloud: req.body.PathCloud,
      Foto64: imagesBase64[0],  // Usar la primera imagen en Base64
    };

    // Llamar al servicio para insertar en la base de datos
    const result = await evidenceService.createEvidence(evidenceData);  // Ahora el servicio está definido
    
    res.status(201).json({ message: 'Evidencia creada exitosamente', data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEvidence };
