const { checkSchema } = require('express-validator')

const getCVValidation = checkSchema({
  userId: {
    in: ["params"],
    exists: { options: { checkFalsy: true } },
    bail: true,
    isNumeric: true,
    errorMessage: 'Id usuario inválido'
  },
  cvId: {
    in: ["params"],
    exists: { options: { checkFalsy: true } },
    bail: true,
    isNumeric: true,
    errorMessage: 'Id cv inválido'
  }
});

module.exports = getCVValidation;
