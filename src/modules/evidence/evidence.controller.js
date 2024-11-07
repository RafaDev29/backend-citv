
const evidenceService = require('./evidence.service'); // Asegúrate de tener este require al principio

const createEvidence = async (req, res) => {
  try {
    // Verificar que hay archivos en la solicitud
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se ha proporcionado ningún archivo' });
    }

    // Iterar sobre cada archivo para obtener su tamaño
    const promises = req.files.map(async (file) => {
      const imageSize = file.size; // El tamaño de la imagen en bytes
      console.log(`Tamaño de la imagen: ${imageSize} bytes`);

      // Convertir la imagen a Base64
      const imageBase64 = file.buffer.toString('base64');

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
        Foto64: imageBase64, // Aquí usamos la imagen convertida a base64
      };

      // Llamar al servicio para insertar en la base de datos
      // return await evidenceService.createEvidence(evidenceData);
      await evidenceService.createEvidence(evidenceData);

      // Devolver la evidencia con la imagen en Base64
      return { ...evidenceData, Foto64: imageBase64 };
    });

    // Ejecutar todas las inserciones de forma paralela
    const results = await Promise.all(promises);

    res.status(201).json({ message: 'Evidencia creada exitosamente', data: results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const convertBase64ToImage = async (req, res) => {
  try {
    const { base64Image, imageName } = req.body;

    // Verifica que el valor de base64Image sea una cadena
    console.log(typeof base64Image);  // Esto debería mostrar 'string'

    if (!base64Image || !imageName) {
      return res.status(400).json({ message: 'Imagen Base64 o nombre de la imagen no proporcionado' });
    }

    // Si el Base64 contiene '0x', lo eliminamos
    const cleanBase64Image = base64Image.replace(/^0x/, '').replace(/\s/g, '');

    // Llamada al servicio para convertir y guardar la imagen
    const imagePath = await evidenceService.convertBase64ToImage(cleanBase64Image, imageName);

    // Devolver la imagen guardada
    res.sendFile(imagePath);
  } catch (err) {
    // Mostrar más detalles del error para depuración
    res.status(500).json({ message: 'Error al guardar la imagen', error: err.message });
  }
};





module.exports = { createEvidence , convertBase64ToImage};
