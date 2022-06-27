const PNC = require('../model/PNC');

exports.getPnc = (req, res) => {
    res.render('pnc', {
        style: 'user.css'
    });
}

exports.addPnc = (req, res) => {
    let newPncData = {
      MRN: req.body.mrn,
      UID: req.body.uid,
      Anc_no: req.body.anc_no,
      date: req.body.visit_date,
      BP: req.body.bp,
      TEMP: req.body.temp,
      lookForPPH: req.body.pph,
      Dribbling: req.body.dribbling,
      Anemia: req.body.anemia,
      VaginalDischarge: req.body.VaginalDischarge,
      pelvicExam: req.body.pelvicExam,
      Breast: req.body.breast,
      VitaminA: req.body.VitaminA,
      BabyBreathing: req.body.baby_breathing,
      BabyBreastFeeding: req.body.baby_feeding,
      BabyWt: req.body.BabyWt,
      Immunization: req.body.Immunization,
      HIVTasted: req.body.HIVTasted,
      HIVTestResult: req.body.hiv_result,
      ARVPxForMother: req.body.ARVPxForMother,
      visit: req.body.visit,
      Next_Appointment: req.body.appointment,
    };

    PNC.create(newPncData).then((result) => {
        console.log('pnc data added!');
    }).catch((err) => {
        console.log(err);
    });

    res.status(200).redirect("/getPnc");
}