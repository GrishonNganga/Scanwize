const request = require("supertest");
const { createServer } = require('../server');
const { sequelize } = require('../models');
const { User } = require('../models')
const app = createServer()

describe('Authentication API', () => {
    // Assuming you have a test user with username 'testuser' and password 'testpassword' in your test database

    test('should return a JWT token on successful signup', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({ username: 'testuser', password: 'testpassword' });
        console.log("RES", res)

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('should return a 401 status on unsuccessful login', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'nonexistentuser', password: 'wrongpassword' });

        expect(res.status).toBe(401);
    });

    test('should return a JWT token on successful login', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    afterAll(async () => {
        await User.destroy({ where: {} });
        await sequelize.close();
    });
});

