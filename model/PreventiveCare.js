const Sequelize = require("sequelize");
const db = require("../config/database");

const PreventiveCare = db.define(
  "preventiveCare",
  {
    MRN: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Pallor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Jaundice: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Chest_Abn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Heart_Abn: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HIV_Test_Performed: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HIV_Test_result: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Vulvar_Ulcer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vaginal_discharge: {
      type: Sequelize.STRING,
    },
    pelvic_mass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
   
    Danger_Signs_Advised: {
      type: Sequelize.STRING,
      allowNull: false,
    },
      Birth_preparedness_advised: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);


module.exports = PreventiveCare;