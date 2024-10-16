const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true, 
    trustServerCertificate: true 
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
