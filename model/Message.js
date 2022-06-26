const Sequelize = require("sequelize");
const db = require("../config/database");

const Message = db.define('message', {
    messageType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    MRN: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Date: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true
});

module.exports = Message;
