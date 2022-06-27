const Sequelize = require("sequelize");
const db = require("../config/database");

const Pnc = db.define(
  "pnc",
  {
    MRN: {
      type: Sequelize.STRING,
    },
    UID: {
      type: Sequelize.STRING,
    },
    Anc_no: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    BP: {
      type: Sequelize.STRING,
    },
    TEMP: {
      type: Sequelize.STRING,
    },
    lookForPPH: {
      type: Sequelize.BOOLEAN,
    },
    Dribbling: {
      type: Sequelize.BOOLEAN,
    },
    Anemia: {
      type: Sequelize.STRING,
    },
    VaginalDischarge: {
      type: Sequelize.BOOLEAN,
    },
    pelvicExam: {
      type: Sequelize.BOOLEAN,
    },
    Breast: {
      type: Sequelize.STRING,
    },
    VitaminA: {
      type: Sequelize.STRING,
    },
    BabyBreathing: {
      type: Sequelize.STRING,
    },
    BabyBreastFeeding: {
      type: Sequelize.STRING,
    },
    BabyWt: {
      type: Sequelize.STRING,
    },
    Immunization: {
      type: Sequelize.STRING,
    },
    HIVTasted: {
      type: Sequelize.BOOLEAN,
    },
    HIVTestResult: {
      type: Sequelize.STRING,
    },
    ARVPxForMother: {
      type: Sequelize.STRING,
      },
    visit: {
      type: Sequelize.STRING,
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

module.exports = Pnc;