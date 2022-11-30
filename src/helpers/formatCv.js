const formatSkillsRoles = (model1, model2) => {
  return [
    ...model1.map(i => {
      return {
        id: i.id,
        name: i.name
      }
    }),
    ...model2.map(i => {
      return {
        id: i.id,
        name: i.name
      }
    })
  ]
}

const formatLanguages = (model) => {
  return [
    ...model.map(i => {
      return {
        id: i.id,
        language: i.language,
        skill: i.skill
      }
    })
  ]
}

const formatProjects = (model) => {
  return [
    ...model.map(i => {
      return {
        id: i.id,
        title: i.title,
        description: i.description,
        startYear: i.startYear,
        endYear: i.endYear
      }
    })
  ]
}

const formatExperience = (model) => {
  return [
    ...model.map(i => {
      return {
        id: i.id,
        name: i.name,
        role: i.role,
        description: i.description,
        startYear: i.startYear,
        endYear: i.endYear
      }
    })
  ]
}

const formatEducation = (model) => {
  return [
    ...model.map(i => {
      return {
        id: i.id,
        title: i.title,
        school: i.school,
        description: i.description,
        startYear: i.startYear,
        endYear: i.endYear
      }
    })
  ]
}

module.exports = {
  formatSkillsRoles,
  formatLanguages,
  formatProjects,
  formatExperience,
  formatEducation
}
