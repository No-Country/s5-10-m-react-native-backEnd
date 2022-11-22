const { Router } = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const {createCV} = require('../controllers/CvController');
const router = Router();


router.post('/user/:userId/create/cv', createCV);

module.exports = router;
