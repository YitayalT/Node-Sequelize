const Sequelize = require('sequelize');
const db = require('../config/database');

const Client = db.define(
  "client",
  {
    name_of_facility: {
      type: Sequelize.STRING,
    },
    MRN: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    date_reg: {
      type: Sequelize.DATE,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    lats_name: {
      type: Sequelize.STRING,
    },
    Grand_Father_name: {
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
    Region: {
      type: Sequelize.STRING,
    },
    Woreda: {
      type: Sequelize.STRING,
    },
    Kebele: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = Client;