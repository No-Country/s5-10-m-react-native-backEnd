const { encryptPw } = require('../helpers/bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleError = require('../helpers/handleError');

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
     handleError( res , 400 , "El usuario no existe");
    } else {
      const user = new User({
        fullName,
        email,
        password: await encryptPw(password)
      });

      await user.save();

      res.json({
        status: true,
        message: 'Usuario creado',
        token: jwt.sign(email, process.env.SECRETKEY)
      });
    }
  } catch (error) {
    handleError( res , 500 , error.message);
  }
};

module.exports = register;
