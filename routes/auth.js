const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSecret = 'your-jwt-secret';
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { requireUser, requireAdmin } = require('../middlewares');

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with a unique username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "your-jwt-token"
 *       400:
 *         description: Invalid input or username already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/signup', async (req, res) => {
    console.log("------> Somesing")
    try {
        const { username, password, role } = req.body;

        // Check if username is already taken
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role: role || 'user', // Set a default role if not provided
        });

        const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, jwtSecret);

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as a user
 *     description: Authenticate and generate a JWT token for the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             example:
 *               token: "your-jwt-token"
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            console.log("User", user)
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, jwtSecret);

            return res.json({ token });
        });
    })(req, res);
});

module.exports = router;
