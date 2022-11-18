const { checkSchema } = require('express-validator')

const forgotPasswordValidation = checkSchema({
  email: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isEmail: true,
    errorMessage: 'Email inválido'
  }
});

module.exports = forgotPasswordValidation