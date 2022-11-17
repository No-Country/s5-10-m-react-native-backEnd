const { createTransport } = require('nodemailer');

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const mailOptions = (email, confirmationLink) => {
  return {
    from: 'myCv App',
    to: email,
    cc: process.env.NODEMAILER_USER,
    subject: '[myCv] Reinicio de contraseña',
    html: `<h3>Por favor, actualice su contraseña siguiendo el siguiente enlace <a href="${confirmationLink}">Actualizar contraseña</a></h3><strong><i>myCv</i></strong>`
  }
};

module.exports = {
  transporter,
  mailOptions
}
