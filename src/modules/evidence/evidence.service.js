const axios = require('axios');
const FormData = require('form-data');
const db = require('../../config/db');

exports.createEvidence = async (body, files) => {
  const { IdIngCou, Item, Detalle, LogUsu } = body;
  const status = 0;

  const evidenceEntries = [];

  try {
      // Enviar cada archivo en una solicitud individual
      for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const formData = new FormData();
          formData.append('file', file.buffer, file.originalname);

          // Solicitud al servicio externo para subir el archivo
          const response = await axios.post('http://198.211.99.223:9000/file/upload', formData, {
              headers: {
                  ...formData.getHeaders()
              }
          });

          // Verificar la respuesta
          if (response.data.message !== "File saved successfully" || !response.data.data) {
              throw new Error("Error uploading files to external service");
          }

          // Crear el registro de evidencia con el enlace obtenido
          const link = response.data.data;
          const evidenceEntry = {
              IdIngCou,
              NumVez: index + 1,
              Item: Item || '-',
              Foto: link, // Enlace devuelto por el servicio externo
              Detalle,
              LogUsu: LogUsu || 'admin',
              FecSis: new Date().toISOString().slice(0, 19).replace('T', ' '),
              ChkCert: index === 0 ? 1 : 0, // Solo la primera imagen tiene ChkCert = 1
              status
          };
          evidenceEntries.push(evidenceEntry);

          // Guardar el registro en la base de datos
          const [result] = await db.query('INSERT INTO evidencia SET ?', evidenceEntry);
          evidenceEntry.id = result.insertId; // Añadir el id del registro insertado para referencia
      }

      return evidenceEntries;

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