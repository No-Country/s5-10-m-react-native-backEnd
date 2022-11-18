const User = require('../models/User');
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const token = req.headers['x-access-token']
    try {
        if(!token){
            return handleError(res, 403, "Token inválido");
        }
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)

        const user = await User.findOne({where: {email: verifyToken}})
        if(!user){
            return handleError(res, 403, "Token inválido");
        }

        next()
    } catch (error) {
        handleError(res, 500, error.message);
    }
}
module.exports = validateToken;