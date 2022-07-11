const {DataTypes, Model }= require('sequelize');
const db = require('../config/database');


class Bed extends Model {}
// const Bed = db.define(
//   "bed",
Bed.init(
  {
    bedNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    dormNo: {
        type: DataTypes.INTEGER,
        allowNull:false,
        unique: true,
      },
      blockName: {
          type: DataTypes.STRING,
          allowNull:false,
    },
    status: {
        type: DataTypes.STRING
      }
  },
  {
    modelName: 'bed',
    sequelize: db,
    freezeTableName: true,
  }
);

module.exports = Bed;