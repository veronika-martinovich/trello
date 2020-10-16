const winston = require('winston');

const options = {
  file: {
    info: {
      filename: `${__dirname}/../logs/info.log`,
      level: 'info',
      colorize: true
    },
    error: {
      filename: `${__dirname}/../logs/error.log`,
      level: 'error',
      colorize: true
    }
  }
};

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
  winston.format.align(),
  winston.format.printf(data => `${data.timestamp}: ${data.message}`)
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(options.file.info),
    new winston.transports.File(options.file.error)
  ],
  exitOnError: false
});

module.exports = logger;
