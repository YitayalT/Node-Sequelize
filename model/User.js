const {Sequelize, Model, DataTypes} = require("sequelize");
const db = require("../config/database");

class User extends Model {}
// const User = db.define(
//   "user",
User.init(
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    City: {
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
    password: {
      type: Sequelize.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    specialization: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    ward: {
      type: DataTypes.STRING
    },
    wardCode: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db,
    freezeTableName: true,
    modelName: 'user'
  }
);
module.exports = User;
