const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../config/database');

// const Client = db.define(
//   "client",
class Client extends Model { }
Client.init(
  {
    UserId: {
      type: DataTypes.STRING,
    },
    name_of_facility: {
      type: DataTypes.STRING,
    },
    MRN: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    date_reg: {
      type: DataTypes.DATE,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    lats_name: {
      type: DataTypes.STRING,
    },
    Grand_Father_name: {
      type: DataTypes.STRING,
    },
    Age: {
      type: DataTypes.INTEGER,
    },
    Sex: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Phone_no: {
      type: DataTypes.STRING,
    },
    Region: {
      type: DataTypes.STRING,
    },
    Woreda: {
      type: DataTypes.STRING,
    },
    Kebele: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "client",
    freezeTableName: true,
  }
);
module.exports = Client;