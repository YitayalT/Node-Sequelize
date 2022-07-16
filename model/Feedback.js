const {DataTypes, Model, Sequelize} = require('sequelize');
const db = require('../config/database');

class Feedback extends Model { }

Feedback.init({
    FullName: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
    },
    feedback: {
        type:DataTypes.TEXT
    }
}, {
    modelName: 'feedback',
    sequelize: db,
    freezeTableName: true
});

module.exports = Feedback;
