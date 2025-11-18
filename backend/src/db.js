require('dotenv').config();
const sql = require('mssql');

const trustServerCertEnv = process.env.DB_TRUST_SERVER_CERTIFICATE;
const trustServerCert = trustServerCertEnv === undefined
  ? true
  : trustServerCertEnv === 'true';

const config = {
  driver: process.env.DB_DRIVER || 'ODBC Driver 17 for SQL Server',
  server: process.env.DB_SERVER || 'MSI\\SQLEXPRESS',
  database: process.env.DB_DATABASE || 'QLSINHVIEN1',
  options: {
    trustedConnection: (process.env.DB_TRUSTED_CONNECTION === 'true'),
    trustServerCertificate: trustServerCert,
    enableArithAbort: true,
  },
  authentication: {
    type: 'default'
  }
};

const dbUser = process.env.DB_USER ?? 'sa';
const dbPassword = process.env.DB_PASSWORD ?? '123';

if (dbUser && dbUser.trim() !== '') {
  config.user = dbUser;
  config.password = dbPassword;
  delete config.options.trustedConnection;
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    throw err;
  });

module.exports = {
  sql, poolPromise
};