const { Model, DataTypes} = require("sequelize");
const db = require("../config/database");

class PreventiveCare extends Model {}
// const PreventiveCare = db.define(
//   "preventiveCare",
 
PreventiveCare.init(
  {
    MRN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    Pallor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Jaundice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Chest_Abn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Heart_Abn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HIV_Test_Performed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HIV_Test_result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vulvar_Ulcer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vaginal_discharge: {
      type: DataTypes.STRING,
    },
    pelvic_mass: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Danger_Signs_Advised: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Birth_preparedness_advised: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "preventiveCare",
    freezeTableName: true,
  }
);
// );


module.exports = PreventiveCare;