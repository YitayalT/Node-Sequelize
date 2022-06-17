const Sequelize = require('sequelize');
//create a database connection!
const db = new Sequelize('maternal_health', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
