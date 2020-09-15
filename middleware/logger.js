/**
 * Loggre module
 * console log the request with method {GET, POST, DELETE, PATCH, PUT} and the path with datee and time
 */
'use-strict';

module.exports = (req, res, next) => {
  console.log('__REQUEST__', req.method, req.path, req.requestTime);
  next();
};