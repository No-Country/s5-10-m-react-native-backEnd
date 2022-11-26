const { comparePw } = require('../helpers/bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleError = require('../helpers/handleError');

const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });

    if (!existUser) {
     return handleError( res , 400 , "Los datos no coinciden");
    }

    const comparePassword = await comparePw(password, existUser.password);

    if(!comparePassword) {
       return handleError( res , 400 , "Los datos no coinciden");
    }


    res.json({
        status: true,
        message: 'Inicio de Sesión exitoso!',
        token: jwt.sign(email, process.env.SECRETKEY)
    });
  } catch (error) {
    handleError( res , 500 , error.message);
  }
};

module.exports = login;
