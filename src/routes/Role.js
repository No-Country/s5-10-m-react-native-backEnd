const { Router } = require('express');
const router = Router();
const { createRole, editRole, getRoles } = require('../controllers/Role.Controller');
const validationMiddleware = require('../middlewares/validationMiddleware');
const validationEditRole = require('../helpers/schemasValidation/editRoleValidation');
const createRoleValidation = require('../helpers/schemasValidation/createSkillValidation');


router.get('/get/roles', getRoles);
router.post('/create/role', validationMiddleware(createRoleValidation), createRole);
router.put('/edit/role/:roleId', validationMiddleware(validationEditRole), editRole);

module.exports = router;
