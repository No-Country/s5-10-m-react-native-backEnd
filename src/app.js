require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

// import routes
const registerRoute = require('./routes/Register');
const passwordRoute = require('./routes/Password');
const cvRoute = require('./routes/cv');
const skillRoute = require('./routes/Skill');
const Login = require('./routes/Login');
const Role = require('./routes/Role');

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// custom midddleware

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', registerRoute);
app.use('/api', passwordRoute);
app.use('/api', cvRoute);
app.use('/api', skillRoute);
app.use('/api', Login);
app.use('/api', Role);


// export app
module.exports = app;
