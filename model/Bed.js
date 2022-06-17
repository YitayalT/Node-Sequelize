const Sequelize = require('sequelize');
const db = require('../config/database');

const Bed = db.define(
  "bed",
  {
    bedNo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    dormNo: {
        type: Sequelize.INTEGER,
        allowNull:false,
        unique: true,
      },
      blockName: {
          type: Sequelize.STRING,
          allowNull:false,
      },
      MRN: {
          type: Sequelize.STRING
      },
      UID: {
          type: Sequelize.STRING
      }
  },
  {
    freezeTableName: true,
  }
);

module.exports = Bed;