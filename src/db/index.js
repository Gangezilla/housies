const { Pool } = require('pg');
const logger = require('../../config/log');

let pool;

const initPool = () => {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
};

const query = (queryText, params, callback) => {
  const start = Date.now();
  return pool.query(queryText, params, (err, res) => {
    const duration = Date.now() - start;
    logger.info('executed query', queryText, 'duration:', duration);
    callback(err, res);
  });
};

module.exports = {
  query,
  initPool,
};
