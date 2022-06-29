const LabResult = require('../model/LabResult');

exports.getLabRequest = (req, res) => {
    res.render('lab-exam', {
        style: 'user.css'
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
    }).catch((err) => {
        console.log(err);
    });

    res.status(200).redirect('/labExam');
}