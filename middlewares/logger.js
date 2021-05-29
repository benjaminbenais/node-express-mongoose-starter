// Code taken from https://github.com/r-spacex/SpaceX-API
const pinoHttp = require('pino-http');
const pino = require('pino');

const { NODE_ENV } = process.env;

let requestLogger;
let logger;

const opts = {
  prettyPrint: true
};

if (NODE_ENV === 'production') {
  requestLogger = pinoHttp();
  logger = pino();
} else {
  requestLogger = pinoHttp(opts);
  logger = pino(opts);
}

module.exports.requestLogger = requestLogger;
module.exports.logger = logger;
