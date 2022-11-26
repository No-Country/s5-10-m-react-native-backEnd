require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

// import routes
const registerRoute = require('./routes/Register');
const passwordRoute = require('./routes/Password');
const cvRoute = require('./routes/Cv');
const skillRoute = require('./routes/Skill');
const Login = require('./routes/Login');

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// custom midddleware

// routes
app.use('/api', registerRoute);
app.use('/api', passwordRoute);
app.use('/api', cvRoute);
app.use('/api', skillRoute);
app.use('/api', Login);


// export app
module.exports = app;
