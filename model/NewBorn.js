const Sequelize = require("sequelize");
const db = require("../config/database");

const NewBorn = db.define("newBorn",{
    UID: {
      type: Sequelize.STRING,
    },
    MRN: {
      type: Sequelize.STRING,
    },
    babyId: {
      type: Sequelize.STRING,
      allowNull: true,
      primaryKey: true,
    },
    time: {
      type: Sequelize.DATE,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    fatherName: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
    birthWeight: {
      type: Sequelize.STRING,
    },
    birthHeight: {
      type: Sequelize.STRING,
    },
    cephalicCircumference: {
      type: Sequelize.STRING,
    },
    stillBirth: {
      type: Sequelize.BOOLEAN,
    },
    alive: {
      type: Sequelize.BOOLEAN,
    },
    died: {
      type: Sequelize.BOOLEAN,
    },
    Ointment: {
      type: Sequelize.BOOLEAN,
    },
    BCGVaccine: {
      type: Sequelize.BOOLEAN,
    },
    PolioVaccine: {
      type: Sequelize.BOOLEAN,
    },
    HepatitisB: {
      type: Sequelize.BOOLEAN,
    },
    VitaminK: {
      type: Sequelize.BOOLEAN,
    },
    Chlorhexidine: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = NewBorn;