const Delivery = require('../model/Delivery');
const User = require('../model/User');
const Client = require('../model/Client');
const NewBorn = require('../model/NewBorn');
const ANCVisit = require('../model/ANCVisit');
const Request = require('../model/Request');
const LabResult = require("../model/LabResult");
const { Op } = require('sequelize');
const Radiology = require('../model/Radiology');

exports.getDelivery = async (req, res) => {
  const token = await req.cookies["access-token"];
 const userID = await req.cookies["userID"];
    res.render('delivery', {
        style: 'style.css',
        title: 'delivery',
        token: token,
        userID: userID
    });
}
exports.deliveryAnc = async (req, res) => {
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
        res.render("delivery-anc", {
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

exports.deliveryAncSearch = async (req, res) => {
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
      res.render("delivery-anc", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deliveryHistory = async (req, res) => {
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
      res.render("delivery-list", {
        result: result,
        style: "style.css",
        title: "delivery list",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.deliverySearch = async (req, res) => {
  const token = await req.cookies["access-token"];
  let query = req.body.mrn;
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
      res.render("delivery-list", {
        result: result,
        style: "style.css",
        token:  token
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
         res.render("new-born-history", {
           result: result,
           style: "style.css",
           title: "delivery list",
           token: token
         });
       })
       .catch((err) => {
         console.log(err);
       });
}

exports.newBornSearch = async (req, res) => {
  const token = await req.cookies["access-token"];
  let query = req.body.mrn;
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
      res.render("new-born-history", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addDelivery = async (req, res) => {
  const userID = await req.cookies["userID"];
  const token = await req.cookies["access-token"];
    let newDeliveryData = {
      MRN: req.body.mrn,
      UID: req.body.user_id,
      Date: req.body.date,
      PartographUsed: req.body.partograph,
      ModeOfDelivery: req.body.mode_of_delivery,
      AMTSL: req.body.amtsl,
      Placenta: req.body.placenta,
      MaternalStatus: req.body.maternal_status,
      Pre_eclampisa: req.body.pre_eclampisa,
      Eclampisa: req.body.eclampisa,
      APH: req.body.aph,
      PPH: req.body.pph,
      Referred: req.body.referred,
      Others: req.body.others,
      AfterBirth: req.body.after_birth,
      Presentation: req.body.presentation,
      DeliveryDuration: req.body.delivery_duration
    };

    Delivery.create(newDeliveryData).then((result) => {
        console.log('delivery data is added!');
          return res.render("delivery", {
            message: "data is submitted successfully",
            style: "style.css",
            script: "index.js",
            token: token,
            userID: userID
          });
    }).catch((err) => {
      console.log(err);
       return res.render("delivery", {
            wrong: "something goes wrong.please, try again!",
            style: "style.css",
            script: "index.js",
            token: token,
            userID: userID
          });
    });
}

exports.deliveryToLab = async (req, res) => {
 const token = await req.cookies["access-token"];
  res.render('delivery-to-lab', {
    style: 'style.css',
    token: token
  });

}

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
 Request.create(data).then((result) => {
   return res.status(200).render("delivery-to-lab", {
     style: 'style.css',
     message: 'request sent!',
     token: token,
     userID: userID
   });
 }).catch((err) => {
   console.log(err);
   return res.status(200).render("delivery-to-lab", {
     style: "style.css",
     wrong: "something goes wrong!",
     token: token,
     userID: userID
   });
 });

}

exports.getLabRequest = async (req, res) => {
  const token = await req.cookies["access-token"];
  Request.findAll({ where: { To: 'lab' } }).then((result) => {
    console.log(result);
    res.status(200).render('request-to-lab', {
      style: 'style.css',
      result: result,
      token: token
    })
  }).catch((err) => {
    console.log(err);
  });
}

exports.labRequestSearch = async (req, res) => {
  const token = await req.cookies["access-token"];
  let query = req.body.mrn;
  Request.findAll({
    where: { [Op.or]: [{ MRN: query }, { FullName: query }] },
    raw: true,
  })
    .then((result) => {
      res.render("request-to-lab", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
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
      res.render("lab-at-delivery", {
        result: result,
        style: "style.css",
        title: "lab result",
        token:token
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
      res.render("lab-at-delivery", {
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
      res.render("rad-at-delivery", {
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
      res.render("rad-at-delivery", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};