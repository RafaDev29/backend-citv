const axios = require('axios');
const FormData = require('form-data');
const db = require('../../config/db');

exports.createEvidence = async (body, files) => {
    const { IdIngCou, Item, Detalle, LogUsu } = body;
    const status = 0;

    // Configura el form-data para enviar los archivos al servicio externo
    const formData = new FormData();
    files.forEach(file => {
        formData.append('file', file.buffer, file.originalname); // `buffer` contiene el archivo cargado en memoria
    });

    try {
        // Enviar archivos al servicio externo y obtener los enlaces
        const response = await axios.post('http://198.211.99.223:9000/file/upload', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        
        if (response.data.message !== "ok" || !Array.isArray(response.data.files)) {
            throw new Error("Error uploading files to external service");
        }

        // Obtener los enlaces de las imágenes
        const links = response.data.files;

        // Crear las entradas de evidencia en la base de datos
        const evidenceEntries = links.map((link, index) => ({
            IdIngCou,
            NumVez: index + 1, // Número de la foto
            Item,
            Foto: link, // Guarda el enlace de la imagen en la nube
            Detalle,
            LogUsu: LogUsu || 'admin',
            FecSis: new Date().toISOString().slice(0, 19).replace('T', ' '),
            ChkCert: index === 0 ? 1 : 0, // Solo la primera imagen tiene ChkCert = 1
            status
        }));

        const insertedRecords = [];
        for (const entry of evidenceEntries) {
            const [result] = await db.query(
                'INSERT INTO evidencia SET ?',
                entry
            );
            insertedRecords.push(result.insertId);
        }
        return insertedRecords;

    } catch (error) {
        throw new Error("Error saving evidence records: " + error.message);
    }
};



exports.listEvidenceGrouped = async () => {
  try {
      const query = `
          SELECT IdIngCou, 
                 GROUP_CONCAT(JSON_OBJECT(
                     'id', id,
                     'NumVez', NumVez,
                     'Item', Item,
                     'Foto', Foto,
                     'Detalle', Detalle,
                     'LogUsu', LogUsu,
                     'FecSis', FecSis,
                     'ChkCert', ChkCert,
                     'status', status
                 )) AS evidences
          FROM evidencia
          GROUP BY IdIngCou;
      `;

      const [rows] = await db.query(query);

      // Formatear el resultado para que cada IdIngCou tenga su lista de evidencias como un array de objetos
      const groupedEvidence = rows.map(row => ({
          IdIngCou: row.IdIngCou,
          evidences: JSON.parse(`[${row.evidences}]`)
      }));

      return groupedEvidence;

  } catch (error) {
      throw new Error("Error retrieving grouped evidence records: " + error.message);
  }
};