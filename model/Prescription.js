const Sequelize = require("sequelize");
const db = require("../config/database");

const Prescription = db.define(
  "prescription",
  {
    MRN: {
      type: Sequelize.STRING,
    },
    UserId: {
      type: Sequelize.STRING,
    },
    Date: {
      type: Sequelize.DATE,
    },
    DrugName: {
      type: Sequelize.STRING,
    },
    Dosage: {
      type: Sequelize.STRING,
    },
    RouteTaken: {
      type: Sequelize.STRING,
    },
    Frequency: {
      type: Sequelize.STRING,
    },
    AmountDispensed: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Prescription;