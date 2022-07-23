const PNC = require('../model/PNC');
const ANCVisit = require('../model/ANCVisit');
const Delivery = require('../model/Delivery');
const Client = require('../model/Client');
const User = require("../model/User");
const NewBorn = require("../model/NewBorn");


exports.getPnc = (req, res) => {
    res.render("pnc", {
      style: "style.css",
      script: "pnc.js",
      validate: 'pnc.css',
    });
}

exports.ancHistory  = (req, res) =>{
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
       res.render("pnc-anc", {
         result: result,
         style: "style.css",
         title: "anc",
       });
     })
     .catch((err) => {
       console.log(err);
     });

}


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
      res.render("pnc-anc", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPnc = (req, res) => {
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
        res.render("pnc", {
          wrong: "something goes wrong please tyr again!",
          style: "style.css",
        });
    });
}

exports.pncHistory = (req, res) => {
  PNC.findAll({
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
       res.render("pnc-history", {
         result: result,
         style: "style.css",
         title: "pnc history",
       });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.pncSearch = (req, res) => {
  let query = req.body.mrn;
  console.log(query);

  PNC.findAll({
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
      res.render("pnc-history", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deliveryHistory = (req, res) => {
  Delivery.findAll({
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
      res.render("pnc-delivery", {
        result: result,
        style: "style.css",
        title: "delivery history",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.deliverySearch = (req, res) => {
  let query = req.body.mrn;
  console.log(query);

  Delivery.findAll({
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
      res.render("pnc-delivery", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newBornHistory = (req, res) => {
  NewBorn.findAll({
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
      res.render("pnc-newBorn", {
        result: result,
        style: "style.css",
        title: "newBorn History",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newBornSearch = (req, res) => {
  let query = req.body.mrn;
  console.log(query);

  NewBorn.findAll({
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
      res.render("pnc-newBorn", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};