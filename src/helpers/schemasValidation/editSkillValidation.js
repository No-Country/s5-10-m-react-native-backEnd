const { checkSchema } = require('express-validator')

const validationEditSkill = checkSchema({
    skillId: {
        in: ["params"],
        exists: {options: {checkFalsy: true} },
        bail: true,
        isString: true,
        errorMessage: "Id inválido"
      },
      name: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Nombre inválido'
  }
});

module.exports = validationEditSkill