const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { encryptPw } = require('../helpers/bcrypt');
const { transporter, mailOptions } = require('../helpers/nodemailer');
const handleError = require('../helpers/handleError');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) handleError(res, 404, "El usuario no se encuentra registrado")
    
    const token = jwt.sign({
      id: user.id
    },
      process.env.SECRETKEY,
      { expiresIn: '30m' }
    );

    const resetLink = `${process.env.FRONT_URI}/password/${token}`

    transporter.sendMail(mailOptions(email, resetLink));

    res.status(200).json({
      status: true,
      message: 'Se ha enviado un email a su correo electrónico'
    });
  } catch (error) {
    handleError(res, 500, "Ha ocurrido un error por favor vuelva a intentarlo");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    const decodedToken = jwt.verify(resetToken, process.env.SECRETKEY);
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) handleError(res, 404, "No se encontró el usuario, por favor intente nuevamente")

    await User.update({
      password: encryptPw(password)
      },
      {
        where: {
          id: user.id
        }
      }
    );

    res.status(200).json({
      status: true,
      message: 'Password actualizada'
    });
  } catch (error) {
    handleError(res, 500, "Ha ocurrido un error por favor vuelva a intentarlo");
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
}
