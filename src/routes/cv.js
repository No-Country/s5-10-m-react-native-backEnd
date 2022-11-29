const { Router } = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const createCVValidation = require('../helpers/schemasValidation/createCVValidation');
const getCVValidation = require('../helpers/schemasValidation/getCVValidation');
const deleteCVValidation = require('../helpers/schemasValidation/deleteCVValidation');
const { createCV, getCV, deleteCV, editCv } = require('../controllers/Cv.Controller');
const router = Router();


router.post('/user/:userId/create/cv', validationMiddleware(createCVValidation), createCV);
router.get('/user/:userId/get/cv', validationMiddleware(getCVValidation), getCV);
router.delete('/user/:userId/delete/:cvId', validationMiddleware(deleteCVValidation), deleteCV);
router.put('/user/:userId/edit/cv/:cvId', editCv );

module.exports = router;
