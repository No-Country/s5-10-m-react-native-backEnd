const { checkSchema } = require('express-validator')

const createCVValidation = checkSchema({
    fullName: {
        exists: { options: { checkFalsy: true } },
        bail: true,
        isString: true,
        errorMessage: 'Nombre inválido'
    },
    rol: {
        exists: { options: { checkFalsy: true } },
        bail: true,
        isString: true,
        errorMessage: 'Rol inválido'
    },
    phone: {
        exists: { options: { checkFalsy: true } },
        bail: true,
        isString: true,
        errorMessage: 'Teléfono inválido'
    },
    email: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isEmail: true,
    errorMessage: 'Email inválido'
  },
  address: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Dirección inválida'
  },
  aboutMe: {
    exists: { options: { checkFalsy: true } },
    bail: true,
    isString: true,
    errorMessage: 'Perfil inválido'
  },
  experiences: {
    custom: {
        options: (value, {req, location, path}) => {
            if(!value){
                return true
            }

            if(!Array.isArray(value) || value.length < 0){
                return false;
            }

            for (const experience of value) {
                if(!experience.title || !experience.description || !experience.startYear || !experience.endYear) {
                    return false
                }
            }

            return true
            
        }
    },
    
    errorMessage: "Experiencia inválida"
  },
  skills: {
    custom: {
        options: (value, {req, location, path}) => {
            if(!value){
                return true
            }

            if(!Array.isArray(value) || value.length < 0){
                return false;
            }

            for (const skill of value) {
                if(!skill.name) {
                    return false
                }
            }

            return true
            
        }
    },
    
    errorMessage: "Hablididad inválida"
  },
  educations: {
    custom: {
        options: (value, {req, location, path}) => {
            if(!value){
                return true
            }

            if(!Array.isArray(value) || value.length < 0){
                return false;
            }

            for (const education of value) {
                if(!education.title || !education.school || !education.description || !education.startYear || !education.endYear) {
                    return false
                }
            }

            return true
            
        }
    },
    
    errorMessage: "Educación inválida"
  }
});

module.exports = createCVValidation