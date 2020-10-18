const logger = require('../common/winston');

// eslint-disable-next-line no-unused-vars
const middlewareErrorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  logger.error(`${statusCode || 500} ${message}`);

  res.status(statusCode || 500).json({
    status: 'error',
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error'
  });
};

const asyncErrorHandler = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = { asyncErrorHandler, middlewareErrorHandler };
