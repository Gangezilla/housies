const logger = require('../../config/log');

const handleError = (error) => {
  logger.error(error);
};

module.exports = handleError;
