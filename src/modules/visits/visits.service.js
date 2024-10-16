// src/modules/visits/visits.service.js
const { poolPromise, sql } = require('../../config/db');

const createVisit = async (internmentId, doctorId, visitDate, visitTime) => {

  try {

    const isoDischargeTime = new Date(`${visitDate}T${visitTime}:00Z`).toISOString();
    console.log(`Fecha y hora combinadas en formato ISO 8601: ${isoDischargeTime}`);

    // Extrae solo la hora en formato HH:mm:ss
    const dischargeTimeFormatted = isoDischargeTime.split('T')[1].split('.')[0]; 
    const [hours, minutes, seconds] = dischargeTimeFormatted.split(':');
    const timeAsDate = new Date();
    timeAsDate.setUTCHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);


    const pool = await poolPromise;
    const result = await pool.request()
      .input('internmentId', sql.Int, internmentId)
      .input('doctorId', sql.Int, doctorId)
      .input('visitDate', sql.Date, visitDate)
      .input('visitTime', sql.Time, timeAsDate)
      .query(`
        INSERT INTO Visitas_Medicas (id_internamiento, id_medico, fecha_visita, hora_visita)
        OUTPUT INSERTED.id_visita, INSERTED.id_internamiento, INSERTED.id_medico, INSERTED.fecha_visita, INSERTED.hora_visita
        VALUES (@internmentId, @doctorId, @visitDate, @visitTime);
      `);

    return result.recordset[0];
  } catch (error) {
    throw new Error('Error creating visit: ' + error.message);
  }
};

const listVisits = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`
        SELECT 
          v.id_visita,
          v.id_internamiento,
          v.id_medico,
          v.fecha_visita,
          v.hora_visita,
          i.numero_habitacion,
          i.cama_asignada,
          i.fecha_ingreso,
          d.nombres AS doctor_names,
          d.apellidos AS doctor_last_names
        FROM Visitas_Medicas v
        JOIN Internamientos i ON v.id_internamiento = i.id_internamiento
        JOIN Medicos d ON v.id_medico = d.id_medico
      `);

     // Procesar resultados para ajustar el formato de hora
     const formattedDischarges = result.recordset.map(visits => {
      return {
        ...visits,
        hora_visita: visits.hora_visita.toISOString().substr(11, 8)  // Extrae solo la parte de la hora
      };
    });
    
    return formattedDischarges;
  
  } catch (error) {
    throw new Error('Error listing visits: ' + error.message);
  }
};

module.exports = {
  createVisit,
  listVisits
};
