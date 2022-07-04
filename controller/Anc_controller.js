const Sequelize = require("sequelize");
const ANCVisit = require("../model/ANCVisit");

exports.getAncVisit = (req, res) => {
    res.render('anc', {
        style: 'user.css',
        title: 'anc'
    });
}

exports.getAncHistory = (req, res) => {
  res.render("anc-history", {
    style: "user.css",
    title: "anc",
  });
}
exports.addAncData = (req, res) => {
    let newAncData = {
      MRN: req.body.mrn,
      UserId: req.body.uid,
      date_of_visit: req.body.visit_date,
      LMP: req.body.gast_age,
      BP: req.body.bp,
      pallor: req.body.pallor,
      Uterine_Height: req.body.uterine_height,
      Fetal_Heart_Beat: req.body.fetal_heart_beat,
      Presentation: req.body.presentation,
      Urine_test_for_infection: req.body.urine_test_infection,
      Urine_test_for_protein: req.body.urine_test_protein,
      Rapid_syphilis_test: req.body.rapid_syphilis_test,
      Hemoglobin: req.body.hemoglobin,
      BG_and_RH: req.body.blood_group,
      TT: req.body.tt,
      Folic_Acid: req.body.iron_folic_acid,
      Mebendazole: req.body.mebendazole,
      Hepatitus: req.body.hepatitus,
      Visit: req.body.visit,
      Next_Appointment: req.body.appointment,
      weight: req.body.weight,
    };
    
    ANCVisit.create({
      MRN: newAncData.MRN,
      UserId: newAncData.UserId,
      date_of_visit: newAncData.date_of_visit,
      LMP: newAncData.LMP,
      BP: newAncData.BP,
      pallor: newAncData.pallor,
      Uterine_Height: newAncData.Uterine_Height,
      Fetal_Heart_Beat: newAncData.Fetal_Heart_Beat,
      Presentation: newAncData.Presentation,
      Urine_test_for_infection: newAncData.Urine_test_for_infection,
      Urine_test_for_protein: newAncData.Urine_test_for_protein,
      Rapid_syphilis_test: newAncData.Rapid_syphilis_test,
      Hemoglobin: newAncData.Hemoglobin,
      BG_and_RH: newAncData.BG_and_RH,
      TT: newAncData.TT,
      Folic_Acid: newAncData.Folic_Acid,
      Mebendazole: newAncData.Mebendazole,
      Hepatitus: newAncData.Hepatitus,
      Visit: newAncData.Visit,
      Next_Appointment: newAncData.Next_Appointment,
      weight: newAncData.weight,
    })
      .then((result) => {
        console.log("data added successfully!");
        return res.render("anc", {
          message: "data inserted successfully!",
          style: "user.css",
          script: "index.js",
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // res.status(200).redirect("/ancVisit");
}