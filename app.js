const { sequelize } = require('./models');
const { createServer } = require("./server");

const app = createServer()

app.listen(process.env.APP_PORT, () => {
    console.log('Server is running on port 3000');
});

// Sync Sequelize models with the database
sequelize.sync({ force: process.env.NODE_ENV }).then(() => {
    console.log('Database and tables created!');
});
