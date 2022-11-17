const { encryptPw } = require('../helpers/bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });
  
    if (existUser) {
      res.json({
        status: 'failed',
        message: 'La direccion de correo se encuentra asociada a una cuenta existente'
      });
    } else {
      const user = new User({
        fullName,
        email,
        password: await encryptPw(password)
      });
      await user.save();
      res.json({
        status: 'success',
        message: 'Usuario creado',
        token: jwt.sign(email, process.env.SECRETKEY)
      });
    }
  } catch (error) {
    res.json({
      status: 'failer',
      message: error.message
    })
  }
};

module.exports = register;
