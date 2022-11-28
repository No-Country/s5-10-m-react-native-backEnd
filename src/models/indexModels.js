const User = require('./User.js');
const Curriculum = require('./Curriculum.js');
const Education = require('./Education.js');
const Experience = require('./Experience.js');
const Project = require('./Project.js');
const Skill = require('./Skill.js');
const Role = require('./Role.js');
const OtherSkill = require('./OtherSkill');
const OtherRole = require('./OtherRole');
const Language = require('./Language');

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
Curriculum.belongsToMany(Skill, {through: "cv_skill"});

Skill.belongsToMany(Curriculum, {through: "cv_skill"});

// cv to otherSkill
Curriculum.hasMany(OtherSkill, {as:'otherSkills',foreignKey: "cvId"});

OtherSkill.belongsTo(Curriculum, {as: "cv"});

// cv to role
Curriculum.hasMany(Role, {as: "roles", foreignKey: "cvId"});

Role.belongsTo(Curriculum, {through: "cvId"});

// cv to otherRole
Curriculum.hasMany(OtherRole, {as: "otherRoles", foreignKey: "cvId"});

OtherRole.belongsTo(Curriculum, {through: "cvId"});

// cv to project

Curriculum.hasMany(Project, {as: "projects", foreignKey: "cvId"});

Project.belongsTo(Curriculum, {as: "cv"});

// cv to language
Curriculum.hasMany(Language, {as: "languages", foreignKey: "cvId"});

Language.belongsTo(Curriculum, {as: "cv"});
