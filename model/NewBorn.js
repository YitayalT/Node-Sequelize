const {Sequelize, DataTypes, Model} = require("sequelize");
const db = require("../config/database");
const Client = require("./Client");
const User = require("./User");

class NewBorn extends Model {}
// const NewBorn = db.define("newBorn",
      NewBorn.init({
    UID: {
          type: DataTypes.STRING,
          references: {
            model: User,
            key: 'user_id'
      }
    },
    MRN: {
      type: DataTypes.STRING,
      references: {
        model: Client,
        key: 'MRN'
      }
    },
    babyId: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
    time: {
      type: DataTypes.DATEONLY,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    fatherName: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.STRING,
    },
    birthWeight: {
      type: DataTypes.STRING,
    },
    birthHeight: {
      type: DataTypes.STRING,
    },
    cephalicCircumference: {
      type: DataTypes.STRING,
    },
    stillBirth: {
      type: DataTypes.BOOLEAN,
    },
    Status: {
      type: DataTypes.STRING,
    },
    Ointment: {
      type: DataTypes.BOOLEAN,
    },
    BCGVaccine: {
      type: DataTypes.BOOLEAN,
    },
    PolioVaccine: {
      type: DataTypes.BOOLEAN,
    },
    HepatitisB: {
      type: DataTypes.BOOLEAN,
    },
    VitaminK: {
      type: DataTypes.BOOLEAN,
    },
    Chlorhexidine: {
      type: DataTypes.BOOLEAN,
    },
  },
        {
          sequelize: db,
          modelName: 'newBorn',
          freezeTableName: true,
  }
);

module.exports = NewBorn;