//Connect api to Postgres database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bible-learning', 'longqi', 'shaneqi', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
