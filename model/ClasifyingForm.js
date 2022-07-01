const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class ClassifyingForm extends Model{}
// const ClassifyingForm = db.define('classifying', {
ClassifyingForm.init(
  {
    MRN: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATE,
    },
    previous_stillbirth: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    spontaneous_abortion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    bw_lt_2500g: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    bw_gt_4000g: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    last_pregnancy_eclampsia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    previous_surgery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    multiple_fetus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    age_lt_16_year: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    age_gt_40_year: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isoimmunization_Rh: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    vaginal_bleeding: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pelvic_mass: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    diastolic_bp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    diabetes_mellitus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    renal_disease: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cardiac_disease: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    chronic_hypertention: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    substance_abuse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    other_medical_disease: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "classifyingForm",
    freezeTableName: true,
  }
);


module.exports = ClassifyingForm;