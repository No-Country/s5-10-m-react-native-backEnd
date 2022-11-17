const { Router } = require('express');
const { forgotPassword, resetPassword } = require('../controllers/Password.Controller'); 
const router = Router();

router.post('/forgot_password', forgotPassword);
router.post('/reset_password/:resetToken', resetPassword);

module.exports = router;
