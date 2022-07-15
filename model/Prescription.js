const {Sequelize, DataTypes, Model} = require("sequelize");
const db = require("../config/database");
const Client = require("./Client");
const User = require("./User");

class Prescription extends Model{}
// const Prescription = db.define(
//   "prescription",
  Prescription.init(
    {
      MRN: {
        type: DataTypes.STRING,
        references: {
          model: Client,
          key: "MRN",
        },
      },
      UserId: {
        type: DataTypes.STRING,
        references: {
          model: User,
          key: "user_id",
        },
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