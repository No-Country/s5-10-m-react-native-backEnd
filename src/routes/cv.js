const { Router } = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const createCVValidation = require('../helpers/schemasValidation/createCVValidation');
const { createCV, getCv } = require('../controllers/Cv.Controller');
const router = Router();


router.post('/user/:userId/create/cv', validationMiddleware(createCVValidation), createCV);
router.get('/user/:userId/get/cv', getCv);

module.exports = router;
