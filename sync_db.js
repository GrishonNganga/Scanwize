const { sequelize } = require('./models');

// Sync Sequelize models with the database
sequelize.sync({ force: process.env.NODE_ENV === "test" }).then(() => {
    console.log('Database and tables created!');
});
