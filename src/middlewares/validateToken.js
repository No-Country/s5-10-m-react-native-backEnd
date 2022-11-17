const User = require('../database/database')
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

    try {
        if(!token){
            return res.status(403).json({status: false, message: "token valido"})
        }
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)

        const user = await User.findOne({where: {email: verifyToken.email}})
        if(!user){
            return res.status(403).json({success: false, msg:'Token inválido'})
        }

        req.userId = verifyToken.id; 

        next()
    } catch (error) {
        res.status(403).json({status: false, message: "Token inválido"})
    }
}
module.exports = validateToken;