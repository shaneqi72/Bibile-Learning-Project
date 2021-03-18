const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createAt: {
        type: Sequelize.STRING,
    },
    updateAt: {
        type: Sequelize.STRING,
    },
});

module.exports = User;
