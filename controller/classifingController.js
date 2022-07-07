const db = require('../config/database');
const ClassifyingForm = require('../model/ClasifyingForm');

exports.classifying = (req, res) => {
    res.render('classifying_form', {
        style: 'home.css'
    });
}

exports.fillForm = (req, res) => {
    let newData = {
        MRN: req.body.mrn,
        UserId: req.body.userId,
        Date: req.body.date,
      previous_stillbirth: req.body.previous_stillbirth,
      spontaneous_abortion: req.body.spontaneous_abortion,
      bw_lt_2500g: req.body.bw_lt_2500g,
      bw_gt_4000g: req.body.bw_gt_4000g,
      last_pregnancy_eclampsia: req.body.last_pregnancy_eclampsia,
      previous_surgery: req.body.previous_surgery,
      multiple_fetus: req.body.multiple_fetus,
      age_lt_16_year: req.body.age_lt_16_year,
      age_gt_40_year: req.body.age_gt_40_year,
      isoimmunization_Rh: req.body.isoimmunization_Rh,
      vaginal_bleeding: req.body.vaginal_bleeding,
      pelvic_mass: req.body.pelvic_mass,
      diastolic_bp: req.body.diastolic_bp,
      diabetes_mellitus: req.body.diabetes_mellitus,
      renal_disease: req.body.renal_disease,
      cardiac_disease: req.body.cardiac_disease,
      chronic_hypertention: req.body.chronic_hypertention,
      substance_abuse: req.body.substance_abuse,
      other_medical_disease: req.body.other_medical_disease,
    };

    ClassifyingForm.create(newData).then((result) => {
        console.log('added!');
         return res.render("classifying_form", {
           message: "successfully collect obstetric history!",
           style: "home.css",
           script: "index.js",
         });
    }).catch((err) => {
        console.log(err);
    });

    // res.status(200).redirect("/classifying");
}