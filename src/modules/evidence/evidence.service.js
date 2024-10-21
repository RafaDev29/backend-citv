
const fs = require('fs');
const path = require('path');

const { poolPromise, sql } = require('../../config/db'); // Asegúrate de que sql también esté importado

const createEvidence = async (data) => {
  let transaction; 
  try {
    const pool = await poolPromise;

    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Verifica si Foto64 es un array, de lo contrario lo envuelve en un array
    const fotos = Array.isArray(data.Foto64) ? data.Foto64 : [data.Foto64];

    console.log('Cantidad de fotos a insertar: ', fotos.length);

    for (const foto of fotos) {
      const request = new sql.Request(transaction);
      await request
        .input('IdIngCou', sql.VarChar, data.IdIngCou)
        .input('NumVez', sql.Int, data.NumVez)
        .input('Item', sql.VarChar, data.Item)
        .input('Detalle', sql.VarChar, data.Detalle)
        .input('LogUsu', sql.VarChar, data.LogUsu)
        .input('ChkCert', sql.Bit, data.ChkCert)
        .input('Foto64', sql.VarChar(sql.Image), foto) // Aquí se inserta cada foto en la iteración
        .input('ChkCloud', sql.Bit, data.ChkCloud)
        .input('PathCloud', sql.VarChar, data.PathCloud)
        .query(`
          INSERT INTO dbo.regfoto
          (IdIngCou, NumVez, Item, Detalle, LogUsu, FecSis, ChkCert, Foto, ChkCloud, PathCloud)
          VALUES (@IdIngCou, @NumVez, @Item, @Detalle, @LogUsu, GETDATE(), @ChkCert, @Foto64, @ChkCloud, @PathCloud)
        `);
    }

    await transaction.commit();

    return { success: true, message: 'Evidencia creada exitosamente' };
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw new Error('Error al crear evidencia: ' + err.message);
  }
};


const convertBase64ToImage = async (base64Image, imageName) => {
  try {
    // Si el prefijo ya ha sido eliminado en el controlador, no necesitas hacer replace aquí.
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Ruta donde se guardará la imagen
    const imagePath = path.join(__dirname, '../../uploads/', imageName);

    // Asegúrate de que la carpeta existe
    const dir = path.join(__dirname, '../../uploads/');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Guardar la imagen decodificada en un archivo
    await fs.promises.writeFile(imagePath, base64Data, 'base64');

    return imagePath; // Devuelve la ruta de la imagen guardada
  } catch (err) {
    throw new Error('Error al convertir y guardar la imagen: ' + err.message);
  }
};
module.exports = { createEvidence, convertBase64ToImage };
