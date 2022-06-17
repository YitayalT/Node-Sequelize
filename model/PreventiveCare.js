const Sequelize = require("sequelize");
const db = require("../config/database");

const PreventiveCare = db.define("preventiveCare",{
    MRN: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Pallor: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Jaundice: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Chest_Abn: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Heart_Abn: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    HIV_Test_Performed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    HIV_Test_result: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Vulvar_Ulcer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    pelvic_mass: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Danger_Signs_Advised: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);


module.exports = PreventiveCare;