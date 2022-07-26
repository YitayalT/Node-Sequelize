const { Op } = require('sequelize');
const PreventiveCare = require('../model/PreventiveCare');
const ANCVisit = require("../model/ANCVisit");
const User = require('../model/User');
const Client = require('../model/Client');
const LabResult = require('../model/LabResult');

exports.getAncVisit = (req, res) => {
    res.render('anc', {
        style: 'style.css',
        title: 'anc visit'
    });
}

exports.getAncHistory = (req, res) => {
  ANCVisit.findAll({
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
      res.render("anc-history", {
        result: result,
        style: "style.css",
        title: "anc history",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.ancSearch = (req, res) => {
  let query = req.body.searchAnc;
  console.log(query);

  ANCVisit.findAll({
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
      res.render("anc-history", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.preventiveCareHistory = (req, res) => {
 PreventiveCare.findAll({
   order: [["createdAt", "DESC"]],
   limit: 10,
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
     res.render("preventive-care-result", {
       result: result,
       style: "style.css",
       title: "care",
     });
   })
   .catch((err) => {
     console.log(err);
   });

}

exports.PreventiveCareSearch = (req, res) => {
  let query = req.body.searchCare;
  console.log(query);

  PreventiveCare.findAll({
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
      res.render("preventive-care-result", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

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
          message: "data submitted successfully!",
          style: "style.css",
          script: "index.js",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.render("anc", {
          wrong: "something goes wrong. please, try again",
          style: "style.css",
          script: "index.js",
        });
      });
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
      res.render("anc-lab", {
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
      res.render("anc-lab", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};