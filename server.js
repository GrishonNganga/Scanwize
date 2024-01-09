const express = require('express');
const passport = require('passport');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const userRoles = require('./routes/user')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger-config');

require('./config/passport-config')
const createServer = () => {

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            secret: 'your-secret-key',
            resave: true,
            saveUninitialized: true,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());


    app.use('/auth', authRoutes);
    app.use('/users', userRoles)

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    return app
}
module.exports = { createServer }