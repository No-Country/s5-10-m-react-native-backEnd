const { Router } = require('express');
const register = require('../controllers/Register.Controller');
const router = Router();

router.post('/register', register);

module.exports = router;
