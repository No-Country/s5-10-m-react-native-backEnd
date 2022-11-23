const { Router } = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const createCVValidation = require('../helpers/schemasValidation/createCVValidation');
const {createCV} = require('../controllers/Cv.Controller');
const router = Router();


router.post('/user/:userId/create/cv', validationMiddleware(createCVValidation), createCV);

module.exports = router;
