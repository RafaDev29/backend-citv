const { poolPromise, sql } = require('../../config/db'); // Asegúrate de que sql también esté importado

const createEvidence = async (data) => {
  let transaction; // Definir la variable transaction antes de try-catch
  try {
    // Obtener el pool de conexiones
    const pool = await poolPromise;
    
    // Iniciar la transacción
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    // Inserta los datos en la tabla regfoto, sin incluir la columna ID (autoincremental)
    const request = new sql.Request(transaction);
    await request
      .input('IdIngCou', sql.VarChar, data.IdIngCou)
      .input('NumVez', sql.Int, data.NumVez)
      .input('Item', sql.VarChar, data.Item)
      .input('Detalle', sql.VarChar, data.Detalle)
      .input('LogUsu', sql.VarChar, data.LogUsu)
      .input('ChkCert', sql.Bit, data.ChkCert)
      .input('Foto64', sql.VarChar(sql.MAX), data.Foto64)  // La imagen en base64
      .input('ChkCloud', sql.Bit, data.ChkCloud)
      .input('PathCloud', sql.VarChar, data.PathCloud)
      .query(`
        INSERT INTO dbo.regfoto
        (IdIngCou, NumVez, Item, Detalle, LogUsu, FecSis, ChkCert, Foto64, ChkCloud, PathCloud)
        VALUES (@IdIngCou, @NumVez, @Item, @Detalle, @LogUsu, GETDATE(), @ChkCert, @Foto64, @ChkCloud, @PathCloud)
      `);

    // Confirmar la transacción
    await transaction.commit();

    return { success: true, message: 'Evidencia creada exitosamente' };
  } catch (err) {
    // Si la transacción fue iniciada, intentar hacer rollback
    if (transaction) await transaction.rollback();
    throw new Error('Error al crear evidencia: ' + err.message);
  }
};

module.exports = { createEvidence };
