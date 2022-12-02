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

const formatCv = (cv) => {
  return {
    id: cv.id,
    userId: cv.userId,
    fullName: cv.fullName,
    phone: cv.phone,
    email: cv.email,
    portfolio: cv.portfolio,
    linkedin: cv.linkedin,
    github: cv.github,
    address: cv.address,
    aboutMe: cv.aboutMe,
    education: formatEducation(cv.educations),
    experience: formatExperience(cv.experiences),
    languages: formatLanguages(cv.languages),
    projects: formatProjects(cv.projects),
    skill: formatSkillsRoles(cv.skills, cv.otherSkills),
    role: formatSkillsRoles(cv.roles, cv.otherRoles)
  }
}

module.exports = formatCv;
