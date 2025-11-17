require('dotenv').config();
const sql = require('mssql');

const config = {
  driver: process.env.DB_DRIVER || 'ODBC Driver 17 for SQL Server',
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: (process.env.DB_TRUSTED_CONNECTION === 'true'),
    trustServerCertificate: (process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'),
    enableArithAbort: true,
  },
  authentication: {
    type: 'default'
  }
};
if (process.env.DB_USER && process.env.DB_USER.trim() !== '') {
  config.user = process.env.DB_USER;
  config.password = process.env.DB_PASSWORD;
  delete config.options.trustedConnection;
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database connection failed: ', err));

module.exports = {
  sql, poolPromise
};