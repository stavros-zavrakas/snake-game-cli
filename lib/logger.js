'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'keys',
  streams: [{
    level: 'info',
    path: 'snake.log' // log INFO and above to stdout
  }, {
    level: 'error',
    path: 'snake.log' // log ERROR and above to a file
  }]
});

module.exports = logger;