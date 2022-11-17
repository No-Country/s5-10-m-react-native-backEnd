const bcrypt = require('bcryptjs');

const encryptPw = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    return error.message;
  }
};

const comparePw = (password, comparePassword) => {
  try {
    return bcrypt.compareSync(password, comparePassword);
  } catch (error) {
    return error.message;
  }
};

module.exports = { encryptPw, comparePw };
