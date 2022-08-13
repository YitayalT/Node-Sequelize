const { DataTypes, Model} = require("sequelize");
const db = require("../config/database");

class Message extends Model{ }
Message.init(
  {
    messageType: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    MRN: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    Date: {
      type:DataTypes.DATEONLY,
      allowNull: true,
    },
  },
    {
        sequelize: db,
        modelName: 'message',
       freezeTableName: true,
  });
// const Message = db.define('message', );

module.exports = Message;
