const { Sequelize } = require("sequelize");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;

const db = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
});

module.exports = db;
