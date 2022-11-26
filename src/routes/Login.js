const { Router } = require('express');
const login = require('../controllers/Login.Controller');
const router = Router();
const validationMiddleware = require('../middlewares/validationMiddleware');
const loginValidation = require('../helpers/schemasValidation/loginValidation');

router.post('/login', validationMiddleware(loginValidation), login);

module.exports = router;
