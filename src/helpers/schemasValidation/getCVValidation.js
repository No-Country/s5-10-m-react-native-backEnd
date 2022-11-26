const { checkSchema } = require('express-validator')

const validationGetCv = checkSchema({
  userId: {
    in: ["params"],
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Id inválido'
  }
});

module.exports = validationGetCv
