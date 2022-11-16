const { checkSchema } = require('express-validator')

const validationLogin = checkSchema({
  email: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isEmail: true,
    errorMessage: 'Enter valid email'
  },
  password: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    matches: {options: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/},
    errorMessage: 'Enter valid password'
  }
});

module.exports = validationLogin