const { Router } = require('express');
const router = Router();
const {createSkill} = require('../controllers/Skill.controller');
const validationCreateSkill = require('../helpers/schemasValidation/createSkillValidation');
const validationMiddleware = require('../middlewares/validationMiddleware');


router.post('/create/skill', validationMiddleware(validationCreateSkill), createSkill);

module.exports = router;
