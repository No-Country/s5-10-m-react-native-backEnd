const { checkSchema } = require('express-validator')

const resetPasswordValidation = checkSchema({
  password: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    matches: {options: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/},
    errorMessage: 'Contraseña inválida'
  },
  resetToken: {
    in: ["body"],
    exists: {options: {checkFalsy: true} },
    bail: true,
    isString: true,
    errorMessage: "Token inválido"
  }
});

module.exports = resetPasswordValidation;