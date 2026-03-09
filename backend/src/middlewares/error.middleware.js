const logger = require('../config/logger');

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error(err.stack);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorMiddleware;
