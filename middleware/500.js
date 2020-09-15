/**
 * 500 module
 * return status 500
 * return json error message
 */
'use-strict';

module.exports = (err, req, res, next) => {
  res.status(500).json({ err: err.message });
};