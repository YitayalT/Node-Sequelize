const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Radiology extends Model {}

Radiology.init({
    MRN: {
        type:DataTypes.STRING
    },
    UserId: {
        type:DataTypes.STRING
    },
    DateOfExam: {
        type: DataTypes.DATE
    },
    TypeOfExam: {
        type:DataTypes.STRING
    },
    Technique: {
        type: DataTypes.STRING
    },
    Impression: {
        type: DataTypes.STRING
    },
    Finding: {
        type: DataTypes.TEXT
    }
}, {
    sequelize: db,
    modelName: 'radiology',
    freezeTableName: true
});

module.exports = Radiology;