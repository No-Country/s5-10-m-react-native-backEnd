const { checkSchema } = require('express-validator')

const getCVsValidation = checkSchema({
  userId: {
    in: ["params"],
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Id inválido'
  }
});

module.exports = getCVsValidation;
