const { closePool } = require('../src/db/');
const logger = require('./log');

exports.Cleanup = function Cleanup() {

  // do app specific cleaning before exiting
  process.on('exit', () => {
    closePool();
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', () => {
    closePool();
    process.exit(2);
  });

  // catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', (e) => {
    logger.error('Uncaught Exception...', e.stack);
    closePool();
    process.exit(99);
  });
};
