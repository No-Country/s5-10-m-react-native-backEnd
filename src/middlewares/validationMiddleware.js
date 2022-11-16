const {validationResult} = require('express-validator');

const validationMiddleware = (schema) => {
    return [
      schema,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
  
          const errorsArray = errors.errors;
          
        //   if there is error return a error
  
          return res.status(404).json(errorsArray);
        }
        // if doesn't exist error, continue
        next()
      }
    ]
  }
  
  module.exports = validationMiddleware