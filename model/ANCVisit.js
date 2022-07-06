const {Sequelize, DataTypes, Model} = require("sequelize");
const db = require("../config/database");
const User = require('./User');
const Client = require('./Client');

class AncVisit extends Model{}
// const AncVisit = db.define(
//   "ancVisit",
  AncVisit.init(
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
      date_of_visit: {
        type: DataTypes.DATE,
      },
      LMP: {
        type: DataTypes.DATE,
      },
      BP: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      pallor: {
        type: DataTypes.STRING,
      },
      Uterine_Height: {
        type: DataTypes.STRING,
      },
      Fetal_Heart_Beat: {
        type: DataTypes.STRING,
      },
      Presentation: {
        type: DataTypes.STRING,
      },
      Urine_test_for_infection: {
        type: DataTypes.BOOLEAN,
      },
      Urine_test_for_protein: {
        type: DataTypes.BOOLEAN,
      },
      Rapid_syphilis_test: {
        type: DataTypes.STRING,
      },
      Hemoglobin: {
        type: DataTypes.STRING,
      },
      BG_and_RH: {
        type: DataTypes.STRING,
      },
      TT: {
        type: DataTypes.STRING,
      },
      Folic_Acid: {
        type: DataTypes.STRING,
      },
      Mebendazole: {
        type: DataTypes.STRING,
      },
      Hepatitus: {
        type: DataTypes.STRING,
      },
      Visit: {
        type: DataTypes.STRING,
      },
      Next_Appointment: {
        type: DataTypes.DATE,
      },
      weight: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: db,
      modelName: "ancVisit",
      freezeTableName: true,
    }
  );
// );

module.exports = AncVisit;