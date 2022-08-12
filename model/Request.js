const {  Model, DataTypes } = require("sequelize");
const db = require("../config/database");
const Client = require('./Client');
const User = require('./User');
class Request extends Model{ }

Request.init({
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
  From: {
    type: DataTypes.STRING,
  },
  To: {
    type: DataTypes.STRING,
  },
  FullName: {
    type: DataTypes.STRING,
  },
  Case: {
    type: DataTypes.STRING,
  },
  RequestDate: {
    type: DataTypes.STRING,
    },
    
},
{
    sequelize: db,
    modelName: "request",
    freezeTableName: true,
  });
module.exports = Request;