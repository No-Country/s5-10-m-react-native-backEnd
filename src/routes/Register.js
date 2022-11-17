const { Router } = require('express');
const register = require('../controllers/Register.Controller');
const router = Router();
const validationMiddleware = require('../middlewares/validationMiddleware');
const registerValidation = require('../helpers/schemasValidation/registerValidation');

router.post('/register', validationMiddleware(registerValidation), register);

module.exports = router;
