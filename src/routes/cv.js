const { Router } = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const {createCV} = require('../controllers/Cv.Controller');
const router = Router();


router.post('/user/:userId/create/cv', createCV);

module.exports = router;
