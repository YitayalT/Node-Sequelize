const Sequelize = require('sequelize');
const db = require('../config/database');

const ClassifyingForm = db.define('classifying', {
  MRN: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  previous_stillbirth: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  spontaneous_abortion: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  bw_lt_2500g: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  bw_gt_4000g: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  last_pregnancy_eclampsia: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  previous_surgery: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  multiple_fetus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  age_lt_16_year: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  age_gt_40_year: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  isoimmunization_Rh: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  vaginal_bleeding: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  pelvic_mass: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  diastolic_bp: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  diabetes_mellitus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  renal_disease: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  cardiac_disease: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  chronic_hypertention: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  substance_abuse: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  other_medical_disease: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
}, {
  freezeTableName: true
});


module.exports = ClassifyingForm;