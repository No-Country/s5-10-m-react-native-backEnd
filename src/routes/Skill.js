const { Router } = require('express');
const router = Router();
const {createSkill} = require('../controllers/Skill.controller');
const validationMiddleware = require('../middlewares/validationMiddleware');


router.post('/create/skill', createSkill);

module.exports = router;
