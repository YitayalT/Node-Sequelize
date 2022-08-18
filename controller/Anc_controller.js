const { Op } = require('sequelize');
const PreventiveCare = require('../model/PreventiveCare');
const ANCVisit = require("../model/ANCVisit");
const User = require('../model/User');
const Client = require('../model/Client');
const LabResult = require('../model/LabResult');
const Radiology = require('../model/Radiology');
const Request = require('../model/Request');

exports.getAncVisit = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
  // console.log('token is:', token);
    res.render('anc', {
        style: 'style.css',
        title: 'anc visit',
        token: token,
        userID: userID
    });
}

exports.getAncHistory = async (req, res) => {
   const token = await req.cookies["access-token"];
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

      // console.log(result);
      res.render("anc-history", {
        result: result,
        style: "style.css",
        title: "anc history",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.ancSearch = async (req, res) => {
   const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.preventiveCareHistory = async (req, res) => {
   const token = await req.cookies["access-token"];
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
       token: token
     });
   })
   .catch((err) => {
     console.log(err);
   });

}

exports.PreventiveCareSearch = async (req, res) => {
   const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addAncData = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
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
          token: token,
          userID: userID
        });
      })
      .catch((err) => {
        console.log(err);
        return res.render("anc", {
          wrong: "something goes wrong. please, try again",
          style: "style.css",
          script: "index.js",
          token: token,
          userID: userID
        });
      });
}

exports.labHistory = async (req, res) => {
   const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.labHistorySearch = async (req, res) => {
   const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.radiologyResult = async (req, res) => {
   const token = await req.cookies["access-token"];
  Radiology.findAll({
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
      res.render("rad-at-anc", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.radiologySearch = async (req, res) => {
   const token = await req.cookies["access-token"];
  let query = req.body.mrn;
  console.log(query);

  Radiology.findAll({
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
      res.render("rad-at-anc", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.ancToLab = async (req, res) => {
  const userID = await req.cookies["userID"];
  const token = await req.cookies["access-token"];
  res.render("anc-to-lab", {
    style: "style.css",
    token: token,
    userID: userID,
  });
};

exports.requestToLab = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];

  let data = {
    MRN: req.body.mrn,
    UserId: req.body.userId,
    From: req.body.from,
    To: req.body.to,
    FullName: req.body.fullName,
    Case: req.body.case,
    RequestDate: req.body.date,
  };
  Request.create(data)
    .then((result) => {
      return res.status(200).render("anc-to-lab", {
        style: "style.css",
        message: "request sent!",
        token: token,
        userID: userID,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).render("delivery-to-lab", {
        style: "style.css",
        wrong: "something goes wrong!",
        token: token,
        userID: userID,
      });
    });
};