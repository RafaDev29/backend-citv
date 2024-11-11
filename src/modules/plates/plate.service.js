const db = require('../../config/db');

exports.createPlate = async (body) => {
    const { IdIngCou, NumVez, PlaVeh } = body;
    const status = 0;

    const plateEntry = {
        IdIngCou,
        NumVez,
        PlaVeh,
        status
    };

    try {
        const [result] = await db.query('INSERT INTO plates SET ?', plateEntry);
        return { id: result.insertId, ...plateEntry };
    } catch (error) {
        throw new Error("Error creating plate record: " + error.message);
    }
};

exports.listActivePlates = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM plates WHERE status = 0');
        return rows;
    } catch (error) {
        throw new Error("Error retrieving active plates: " + error.message);
    }
};
