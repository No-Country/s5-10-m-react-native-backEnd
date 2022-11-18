const { checkSchema } = require('express-validator')

const validationLogin = checkSchema({
  email: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isEmail: true,
    errorMessage: 'Email inválido'
  },
  password: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Contraseña inválida'
  }
});

module.exports = validationLogin