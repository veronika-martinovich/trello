const logger = require('./winston');

const httpLogger = (req, res, next) => {
  logger.info(
    `${req.method} ${req.protocol}://${req.hostname}:${req.socket.localPort +
      req.originalUrl} queryParams:${JSON.stringify(
      req.query
    )} body:${JSON.stringify(req.body)}`
  );
  next();
};

module.exports = httpLogger;
