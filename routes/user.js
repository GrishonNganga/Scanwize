const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { requireUser, requireAdmin } = require("../middlewares")

/**
 * @swagger
 * /users/user-details:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of the authenticated user
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               username: "exampleUser"
 *               role: "user"
 *       401:
 *         description: Unauthorized, invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/user-details', requireUser, (req, res) => {
    // The user object is available in req.user after successful JWT authentication
    const { id, username, role } = req.user;
    res.json({ id, username, role });
});


/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users details (Has to be an Admin)
 *     description: Retrieve details of all users. The authenticated user has to have the role of 'admin'
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 username: "adminUser"
 *                 role: "admin"
 *               - id: 2
 *                 username: "user1"
 *                 role: "user"
 *               - id: 3
 *                 username: "user2"
 *                 role: "user"
 *       401:
 *         description: Unauthorized, invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/all', requireUser, requireAdmin, async (req, res) => {
    try {
        // Retrieve all users
        const allUsers = await User.findAll({ attributes: ['id', 'username', 'role'] });
        res.json({ users: allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
