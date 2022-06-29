const { Model, DataTypes } = require("sequelize");
const db = require("../config/database");

class LabResult extends Model {}

LabResult.init(
  {
    MRN: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.STRING,
    },
    DateOfExam: {
      type: DataTypes.DATE,
    },
    TotalWBC: {
      type: DataTypes.INTEGER,
    },
    Neutrophils: {
      type: DataTypes.DOUBLE,
    },
    Lymphocytes: {
      type: DataTypes.DOUBLE,
    },
    Eusinophils: {
      type: DataTypes.DOUBLE,
    },
    Monocytes: {
      type: DataTypes.DOUBLE,
    },
    Basophils: {
      type: DataTypes.DOUBLE,
    },
    Hemoglobin: {
      type: DataTypes.DOUBLE,
    },
    MalariaParasite: {
      type: DataTypes.STRING,
    },
    RandomBloodSugar: {
      type: DataTypes.DOUBLE,
    },
    Urea: {
      type: DataTypes.DOUBLE,
    },
    Creatinine: {
      type: DataTypes.DOUBLE,
    },
    SGPT: {
      type: DataTypes.DOUBLE,
    },
    SGOT: {
      type: DataTypes.DOUBLE,
    },
    RBC: {
      type: DataTypes.INTEGER,
    },
    PregnancyTest: {
      type: DataTypes.STRING,
    },
    PusCells: {
      type: DataTypes.DOUBLE,
    },
    EpithelialCells: {
      type: DataTypes.DOUBLE,
    },
    Others: {
      type: DataTypes.STRING,
    },
    MantouxTest: {
      type: DataTypes.STRING,
    },
    Finding: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "labResult",
    freezeTableName: true,
  }
);

module.exports = LabResult;
