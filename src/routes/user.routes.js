const express = require('express')

//controllers 
const { login  } = require('../controllers/Login.Controller')

const usersRoutes = express.Router()

usersRoutes.post('/login', login)


module.exports = { usersRoutes }