const Sequelize = require("sequelize");
const db = require("../config/database");


const AncVisit = db.define(
  "ancVisit",
  {
    MRN: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Anc_no: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    date_of_visit: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    LMP: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    BP: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    weight: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pallor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Uterine_Height: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Fetal_Heart_Beat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Presentation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Urine_test_for_infection: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Urine_test_for_protein: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Rapid_syphilis_test: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Hemoglobin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    BG_and_RH: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    TT: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Folic_Acid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Mebendazole: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Hepatitus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Visit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Next_Appointment: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = AncVisit;