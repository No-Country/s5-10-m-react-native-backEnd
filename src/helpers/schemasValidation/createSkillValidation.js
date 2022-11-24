const { checkSchema } = require('express-validator')

const validationCreateSkill = checkSchema({
  name: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Nombre inválido'
  }
});

module.exports = validationCreateSkill