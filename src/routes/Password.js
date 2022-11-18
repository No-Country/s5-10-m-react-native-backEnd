const { Router } = require('express');
const { forgotPassword, resetPassword } = require('../controllers/Password.Controller'); 
const validationMiddleware = require('../middlewares/validationMiddleware')
const forgotPasswordValidation = require('../helpers/schemasValidation/forgotPasswordValidation');
const resetPasswordValidation = require('../helpers/schemasValidation/resetPasswordValidation');
const router = Router();


router.post('/forgot_password', validationMiddleware(forgotPasswordValidation), forgotPassword);
router.post('/reset_password/:resetToken', validationMiddleware(resetPasswordValidation), resetPassword);

module.exports = router;
