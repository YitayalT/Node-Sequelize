const LabResult = require('../model/LabResult');
const User = require('../model/User');
// const moment = require('moment');
const Client = require('../model/Client');

exports.getLabRequest = (req, res) => {
    res.render('lab-exam', {
        style: 'style.css'
    });
}

exports.addLabResult = (req, res) => {

    let newLabResult = {
      MRN: req.body.mrn,
      UserId: req.body.uid,
      DateOfExam: req.body.date,
      TotalWBC: req.body.wbc,
      Neutrophils: req.body.neutrophils,
      Lymphocytes: req.body.lymphocytes,
      Eusinophils: req.body.eusinophils,
      Monocytes: req.body.monocytes,
      Basophils: req.body.basophils,
      Hemoglobin: req.body.hemoglobin,
      MalariaParasite: req.body.malaria,
      RandomBloodSugar: req.body.sugar,
      Urea: req.body.urea,
      Creatinine: req.body.creatinine,
      SGPT: req.body.sgpt,
      SGOT: req.body.sgot,
      RBC: req.body.rbc,
      PregnancyTest: req.body.pregnancy,
      PusCells: req.body.pusCells,
      EpithelialCells: req.body.Epithelial,
      Others: req.body.others,
      MantouxTest: req.body.mantoux,
      Finding: req.body.finding,
    };

    LabResult.create(newLabResult).then((result) => {
      console.log('lab result added!');
      return res.render("lab-exam", {
        message: "data is added successfully",
        style: "style.css",
        script: "index.js",
      });
    }).catch((err) => {
      console.log(err);
      return res.render("lab-exam", {
        wrong: "something goes wrong. please, try again!",
        style: "style.css",
        script: "index.js",
      });
    });

    // res.status(200).redirect('/labExam');
}


exports.labHistory = (req, res) => {
  LabResult.findAll({
    order: [["createdAt", "DESC"]],
    limit: 4,
    include: [
      {
        model: User,
      },
      {
        model: Client,
      },
    ],
    raw: true,
  })
    .then((result) => {
      console.log(result);
      res.render("lab-history", {
        result: result,
        style: "style.css",
        title: "lab result",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.labHistorySearch = (req, res) => {
  let query = req.body.labSearch;
  console.log(query);

  LabResult.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Client,
      },
    ],
    where: {
      MRN: query,
    },
    raw: true,
  })
    .then((result) => {
      res.render("lab-history", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};