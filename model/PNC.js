const {Sequelize, Model, DataTypes} = require("sequelize");
const db = require("../config/database");
const Client = require("./Client");
const User = require("./User");

// const Pnc = db.define(
//   "pnc",
class Pnc extends Model { }
Pnc.init(
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
   
    date: {
      type: DataTypes.DATE,
    },
    BP: {
      type: DataTypes.STRING,
    },
    TEMP: {
      type: DataTypes.STRING,
    },
    lookForPPH: {
      type: DataTypes.STRING,
    },
    Dribbling: {
      type: DataTypes.STRING,
    },
    Anemia: {
      type: DataTypes.STRING,
    },
    VaginalDischarge: {
      type: DataTypes.STRING,
    },
    pelvicExam: {
      type: DataTypes.STRING,
    },
    Breast: {
      type: DataTypes.STRING,
    },
    VitaminA: {
      type: DataTypes.STRING,
    },
    BabyBreathing: {
      type: DataTypes.STRING,
    },
    BabyBreastFeeding: {
      type: DataTypes.STRING,
    },
    BabyWt: {
      type: DataTypes.STRING,
    },
    Immunization: {
      type: DataTypes.STRING,
    },
    HIVTasted: {
      type: DataTypes.STRING,
    },
    HIVTestResult: {
      type: DataTypes.STRING,
    },
    ARVPxForMother: {
      type: DataTypes.STRING,
    },
    visit: {
      type: DataTypes.STRING,
    },
    Next_Appointment: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    modelName: "pnc",
    sequelize: db,
  }
);

module.exports = Pnc;