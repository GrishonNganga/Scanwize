module.exports = {
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": "scanwize-db",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": "scanwize_test-db",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "scanwize&&strong",
    "database": "scanwize_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}