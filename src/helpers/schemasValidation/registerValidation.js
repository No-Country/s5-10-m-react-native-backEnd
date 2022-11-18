const { checkSchema } = require('express-validator')

const registerValidation = checkSchema({
  fullName: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Nombre completo inválido'
  },
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
    matches: {options: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/},
    errorMessage: 'Contraseña inválida'
  }
});

module.exports = registerValidation