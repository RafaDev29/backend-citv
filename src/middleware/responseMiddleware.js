// src/middleware/responseMiddleware.js
const responseMiddleware = (req, res, next) => {
    res.success = (data, message = 'Operación exitosa') => {
      res.status(200).json({
        message,
        status: true,
        data
      });
    };
  
    res.error = (message, statusCode = 500, data = null) => {
      res.status(statusCode).json({
        message,
        status: false,
        data
      });
    };
  
    next();
  };
  
  module.exports = responseMiddleware;
  