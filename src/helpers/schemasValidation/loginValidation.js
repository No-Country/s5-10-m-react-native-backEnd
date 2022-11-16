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
    errorMessage: 'Enter valid password'
  }
});

module.exports = validationLogin