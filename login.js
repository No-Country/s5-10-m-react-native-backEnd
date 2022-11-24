// esto es para encriptar la contraseña , iria en users controller
const bcrypt = require("bcrypt.js");
const jwt = require('jsonwebtoken')

//encrypt to password esto iria en create users en users controller
const salt = await bcrypt.genSalt(12);
const hashedPassword = await bcrypt.hash(password, "");

// creamos el login esto deve ir igual en user.controller

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

const token = jwt.sign({id:user.id},'secret', {expiresIn:'5m'})

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
