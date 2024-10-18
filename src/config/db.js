const sql = require('mssql');

const dbConfig = {
  user: 'sa',
  password: '0313334',
  server: 'jupiter!sd4a',
  database: 'SistCITVRD|lelesda',
  port: 1433,
  options: {
    encrypt: false, 
    trustServerCertificate: false 
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conectado a la base de datos SQL Server');
    return pool;
  })

  .catch(err => console.log('Error en la conexión a la base de datos:', err));

module.exports = {
  sql, poolPromise
};
