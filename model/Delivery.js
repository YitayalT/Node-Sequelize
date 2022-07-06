const {Sequelize, DataTypes, Model} = require("sequelize");
const db = require("../config/database");
const Client = require("./Client");
const User = require("./User");

class Delivery extends Model { }

// const Delivery = db.define(
//   "delivery",
Delivery.init(
  {
    MRN: {
      type: DataTypes.STRING,
      references: {
        model: Client,
        key: 'MRN'
      }
    },
    UID: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'user_id'
      }
    },
  
    Date: {
      type: DataTypes.DATE,
    },
    PartographUsed: {
      type: DataTypes.BOOLEAN,
    },
    ModeOfDelivery: {
      type: DataTypes.STRING,
    },
    AMTSL: {
      type: DataTypes.STRING,
    },
    Placenta: {
      type: DataTypes.STRING,
    },
    MaternalStatus: {
      type: DataTypes.STRING,
    },
    Pre_eclampisa: {
      type: DataTypes.BOOLEAN,
    },
    Eclampisa: {
      type: DataTypes.BOOLEAN,
    },
    APH: {
      type: DataTypes.BOOLEAN,
    },

    PPH: {
      type: DataTypes.BOOLEAN,
    },
    Referred: {
      type: DataTypes.BOOLEAN,
    },
    Others: {
      type: DataTypes.BOOLEAN,
    },
    AfterBirth: {
      type: DataTypes.STRING,
    },
    Presentation: {
      type: DataTypes.STRING,
    },
    DeliveryDuration: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'delivery',
    freezeTableName: true,
  }
);


module.exports = Delivery;