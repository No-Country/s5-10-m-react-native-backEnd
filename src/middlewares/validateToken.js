const User = require('../database/database')

const validateToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

    try {
        if(!token){
            return res.status(400).json({status: "failde", message: "Se necesita un token valido"})
        }
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)

        const user = await User.findByPk(verifyToken.id)
        if(!user){
            return res.json({success: "failde", msg:'Token inválido'})
        }

        req.userId = verifyToken.id; 

        next()
    } catch (error) {
        res.status(400).json({status: "failed", message: "Token inválido"})
    }
}
module.exports = validateToken;