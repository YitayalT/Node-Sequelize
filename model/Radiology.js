const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');
const Client = require('./Client');

class Radiology extends Model {}

Radiology.init(
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
    DateOfExam: {
      type: DataTypes.DATE,
    },
    TypeOfExam: {
      type: DataTypes.STRING,
    },
    Technique: {
      type: DataTypes.STRING,
    },
    Impression: {
      type: DataTypes.STRING,
    },
    Finding: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "radiology",
    freezeTableName: true,
  }
);

module.exports = Radiology;