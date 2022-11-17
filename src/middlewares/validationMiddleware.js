const {validationResult} = require('express-validator');

const validationMiddleware = (schema) => {
    return [
      schema,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
  
          const errorsArray = errors.errors;
          
        //   if there is error return a error
  
          return res.status(400).json({status: false, message: "datos inválidos", errors: errorsArray});
        }
        // if doesn't exist error, continue
        next()
      }
    ]
  }
  
  module.exports = validationMiddleware