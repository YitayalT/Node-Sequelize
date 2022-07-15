const PNC = require('../model/PNC');

exports.getPnc = (req, res) => {
    res.render('pnc', {
        style: 'style.css'
    });
}

exports.addPnc = (req, res) => {
    // console.log();
    // var visitDate = new Date(req.body.visit_date).toLocaleDateString();
    // console.log(visitDate);
    let newPncData = {
      MRN: req.body.mrn,
      UserId: req.body.uid,
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
      HIVTasted: req.body.HivTasted,
      HIVTestResult: req.body.hiv_result,
      ARVPxForMother: req.body.ARVPxForMother,
      visit: req.body.visit,
      Next_Appointment: req.body.appointment,
    };

    PNC.create(newPncData).then((result) => {
        console.log('pnc data added!');
        res.render("pnc", {
          message: "pnc data is added successfully!",
          style: "style.css",
        });
    }).catch((err) => {
        console.log(err);
    });

    // res.status(200).redirect("/getPnc");
}