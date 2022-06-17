const Sequelize = require("sequelize");
const db = require("../config/database");

const Delivery = db.define("delivery", {
    MRN: {
      type: Sequelize.STRING,
    },
    UID: {
      type: Sequelize.STRING,
    },
    Anc_no: {
      type: Sequelize.STRING,
    },
    Date: {
      type: Sequelize.DATE,
    },
    PartographUsed: {
      type: Sequelize.BOOLEAN,
    },
    ModeOfDelivery: {
      type: Sequelize.STRING,
    },
    AMTSL: {
      type: Sequelize.STRING,
    },
    Placenta: {
      type: Sequelize.STRING,
    },
    MaternalStatus: {
      type: Sequelize.STRING,
    },
    Pre_eclampisa: {
      type: Sequelize.BOOLEAN,
    },
    APH: {
      type: Sequelize.BOOLEAN,
    },
    Eclampisa: {
      type: Sequelize.BOOLEAN,
    },
    PPH: {
      type: Sequelize.BOOLEAN,
    },
    Referred: {
      type: Sequelize.BOOLEAN,
    },
    Others: {
      type: Sequelize.BOOLEAN,
    },
    AfterBirth: {
      type: Sequelize.STRING,
    },
    Presentation: {
      type: Sequelize.STRING,
    },
    DeliveryDuration: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);


module.exports = Delivery;