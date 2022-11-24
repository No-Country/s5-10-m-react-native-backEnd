const bcrypt = require("bcrypt.js");
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

//model
const { } = require('../models/User')


const login = async (req, res) => {};
try {
  // Get email y password from req.body
  const { email, password } = req.body;

  //validate if user exist with given email
  const user = await User.findOne({
    where: { email, status: "active" },
  });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  //compare password (entered password vs db password)
  // If user doesn't exist or password,send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({
      status: "error",
      message: "wrong credentials",
    });
  }

  //Generate JWT

const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {
expiresIn:'5m'
})

  res.status(200).json({
    status: "success",
    data: { user , token },
  });
} catch (error) {
  console.log(error);
}

module.export = {
  login,
};
