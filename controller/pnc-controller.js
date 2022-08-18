const PNC = require('../model/PNC');
const ANCVisit = require('../model/ANCVisit');
const Delivery = require('../model/Delivery');
const Client = require('../model/Client');
const User = require("../model/User");
const NewBorn = require("../model/NewBorn");
const LabResult = require('../model/LabResult');
const Radiology = require('../model/Radiology');
const Request = require('../model/Request');


exports.getPnc = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
    res.render("pnc", {
      style: "style.css",
      script: "pnc.js",
      validate: 'pnc.css',
      token: token,
      userID: userID
    });
}

exports.ancHistory = async (req, res) => {
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
       console.log(result);
       res.render("pnc-anc", {
         result: result,
         style: "style.css",
         title: "anc",
         token: token
       });
     })
     .catch((err) => {
       console.log(err);
     });

}


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
      res.render("pnc-anc", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPnc = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
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
          token: token,
          userID: userID
        });
    }).catch((err) => {
        console.log(err);
        res.render("pnc", {
          wrong: "something goes wrong please tyr again!",
          style: "style.css",
          token: token,
          userID: userID
        });
    });
}

exports.pncHistory = async  (req, res) => {
  const token = await req.cookies["access-token"];
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
         token: token
       });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.pncSearch = async (req, res) => {
  const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deliveryHistory = async  (req, res) => {
  const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.deliverySearch = async (req, res) => {
  const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newBornHistory = async (req, res) => {
  const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newBornSearch = async (req, res) => {
  const token = await req.cookies["access-token"];
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
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.labHistory = async  (req, res) => {
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
      res.render("pnc-lab", {
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
      res.render("pnc-lab", {
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
      res.render("pnc-rad", {
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
      res.render("pnc-rad", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.pncToLab = async (req, res) => {
  const userID = await req.cookies["userID"];
  const token = await req.cookies["access-token"];
  res.render("pnc-to-lab", {
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
    Case: req.body.case,
    RequestDate: req.body.date,
  };
  Request.create(data)
    .then((result) => {
      return res.status(200).render("pnc-to-lab", {
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