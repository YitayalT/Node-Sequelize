const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "user",
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    City: {
      type: Sequelize.STRING,
    },
    Age: {
      type: Sequelize.INTEGER,
    },
    Sex: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Phone_no: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
    },
    specialization: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = User;
