const Sequelize = require("sequelize");
//database,root,password and an object
const sequelize = new Sequelize("user-database", 'root', '@Arif3198', {
    dialect: 'mysql',
    host: "localhost"
})
module.exports = sequelize