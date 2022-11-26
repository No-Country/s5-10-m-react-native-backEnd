const { checkSchema } = require('express-validator')

const validationDeleteCv = checkSchema({
  userId: {
    in: ["params"],
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Id usuario inválido'
  },
  cvId: {
    in: ["params"],
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Id cv inválido'
  }
});

module.exports = validationDeleteCv
