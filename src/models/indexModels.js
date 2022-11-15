const User = require('./User.js');
const Curriculum = require('./Curriculum.js');
const Education = require('./Education.js');
const Experience = require('./Experience.js');
const Project = require('./Project.js');
const Skill = require('./Skill.js');

// relation

// user and cv
User.hasMany(Curriculum, {as: 'curriculums', foreignKey: "userId"});

Curriculum.belongsTo(User, {as: "user"});

// cv to experience
Curriculum.hasMany(Experience, {as: 'experiences', foreignKey: "cvId"});

Experience.belongsTo(Curriculum, {as: "cv"});

// cv to education
Curriculum.hasMany(Education, {as: 'educations', foreignKey: "cvId"});

Education.belongsTo(Curriculum, {as: "cv"});

// cv to skill
Curriculum.hasMany(Skill, {as: 'skills', foreignKey: "cvId"});

Skill.belongsTo(Curriculum, {as: "cv"});

// cv to project

Curriculum.hasMany(Project, {as: "projects", foreignKey: "cvId"});

Project.belongsTo(Curriculum, {as: "cv"});