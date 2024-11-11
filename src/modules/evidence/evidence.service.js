const db = require('../../config/db');

exports.createEvidence = async (body, files) => {
    const { IdIngCou, Item, Detalle, LogUsu } = body;
    const status = 0;

    const evidenceEntries = files.map((file, index) => ({
        IdIngCou,
        NumVez: index + 1, // Número de la foto: 1 para la primera, 2 para la segunda, etc.
        Item,
        Foto: file.filename, // Guarda solo el nombre del archivo
        Detalle,
        LogUsu: LogUsu || 'admin',
        FecSis: new Date().toISOString().slice(0, 19).replace('T', ' '),
        ChkCert: index === 0 ? 1 : 0, // Solo la primera imagen tiene ChkCert = 1
        status
    }));

    try {
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
