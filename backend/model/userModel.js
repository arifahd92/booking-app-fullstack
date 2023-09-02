const Sequelize = require("sequelize");
const sequelize = require("../connection/connection");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER, // Correct data type for an auto-incrementing integer
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING, // Correct data type for phone numbers
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User; // Export the User model class
