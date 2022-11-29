const { checkSchema } = require('express-validator')

const editCVValidation = checkSchema({
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
                if(!experience.id){
                    return false;
                }


                if(experience.name || experience.role || experience.description || experience.startYear || experience.endYear) {
                    return true;
                } else {
                    return false;
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
                if(!skill.id && !skill.nameToEdit && skill.nameForEdit){
                    return false;
                }
            }

            return true
            
        }
    },
    
    errorMessage: "Habilidad inválida"
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
                if(!education.id){
                    return false;
                }
                if(education.title || education.school || education.description || education.startYear || education.endYear) {
                    return true
                } else {
                    return false
                }
            }

            return true
            
        }
    },
    
    errorMessage: "Educación inválida"
  },
  role:{
    custom: {
        options: (value, {req, location, path}) => {
            if(!value){
                return true
            }

            if(!value.id && !value.nameToEdit && !value.nameForEdit ){
                return false;
            }

            return true
            
        }
    },
    errorMessage: "Rol inválido"
    },
  languages: {
    custom: {
        options: (value, {req, location, path}) => {
            if(!value){
                return true
            }

            if(!Array.isArray(value) || value.length < 0){
                return false;
            }

            for (const language of value) {
               if(!language.id){
                return false;
               }
                if(language.skill){
                    if(language.skill !== "basico" && language.skill !== "intermedio" && language.skill !== "avanzado"){
                        return false
                    }
                }
            }

            return true
            
        }
    },
    
    errorMessage: "Lenguaje inválido"
  },
  
});

module.exports = editCVValidation