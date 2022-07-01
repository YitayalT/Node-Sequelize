const {Sequelize, DataTypes, Model} = require("sequelize");
const db = require("../config/database");

class Prescription extends Model{}
// const Prescription = db.define(
//   "prescription",
  Prescription.init(
    {
      MRN: {
        type: DataTypes.STRING,
      },
      UserId: {
        type: DataTypes.STRING,
      },
      Date: {
        type: DataTypes.DATE,
      },
      DrugName: {
        type: DataTypes.STRING,
      },
      Dosage: {
        type: DataTypes.STRING,
      },
      RouteTaken: {
        type: DataTypes.STRING,
      },
      Frequency: {
        type: DataTypes.STRING,
      },
      AmountDispensed: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      sequelize: db,
      modelName: "prescription",
    }
  );

module.exports = Prescription;