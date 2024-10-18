// src/modules/visits/visits.service.js
const { poolPromise } = require('../../config/db');



const listPlates = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`
       SELECT IdIngCou, NumVez, PlaVeh 
FROM INGCOU
WHERE IdEst = '01'
Order By 1 DESC
        
      `);



        return result.recordset;

    } catch (error) {
        throw new Error('Error al listar las placas: ' + error.message);
    }
};

module.exports = {
    listPlates
};
