const { createTransport } = require('nodemailer');

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const mailOptions = (email, token) => {
  return {
    from: 'myCv App',
    to: email,
    cc: process.env.NODEMAILER_USER,
    subject: '[myCv] Reinicio de contraseña',
    html: `<h3>Por favor, actualice su contraseña introduciendo el siguiente token:<br> <strong>${token}</strong></h3><strong><i>myCv</i></strong>`
  }
};

module.exports = {
  transporter,
  mailOptions
}
