const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { encryptPw } = require('../helpers/bcrypt');
const {nanoid} = require('nanoid');
const { transporter, mailOptions } = require('../helpers/nodemailer');
const handleError = require('../helpers/handleError');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) handleError(res, 404, "El usuario no se encuentra registrado")
    
    const token = nanoid(6);
    
    await User.update({
      resetToken: token
    }, {
      where: {
        email
      }
    });

    transporter.sendMail(mailOptions(email, token));

    res.status(200).json({
      status: true,
      message: 'Se ha enviado un email a su correo electrónico'
    });
  } catch (error) {
    handleError(res, 500, "Ha ocurrido un error por favor vuelva a intentarlo");
  }
};

const confirmToken = async (req, res) => {
  try {
    const { resetToken } = req.body;
    const user = await User.findOne({ where: { resetToken } });
    if (user) res.status(200).json({
      status: true,
      token: user.resetToken
    })
  } catch (error) {
    handleError(res, 401, "Token invalido");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, resetToken } = req.body;

    const user = await User.findOne({ where: { resetToken } });

    if (!user) handleError(res, 404, "No se encontró el usuario, por favor intente nuevamente")

    await User.update({
      resetToken: null
    }, {
      where: {
        id: user.id
      }
    });

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
  confirmToken,
  resetPassword,
}
