const { Router } = require('express');
const router = Router();
const {createRole} = require('../controllers/Role.Controller');
const validationMiddleware = require('../middlewares/validationMiddleware');


router.post('/create/role', createRole);

module.exports = router;
