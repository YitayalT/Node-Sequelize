const Delivery = require('../model/Delivery');
const User = require('../model/User');
const Client = require('../model/Client');
const NewBorn = require('../model/NewBorn');
const ANCVisit = require('../model/ANCVisit');
const Request = require('../model/Request');

exports.getDelivery = (req, res) => {
    res.render('delivery', {
        style: 'style.css',
        title: 'delivery'
    });
}
exports.deliveryAnc = (req, res) =>{
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deliveryAncSearch = (req, res) => {
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
      res.render("delivery-list", {
        result: result,
        style: "style.css",
        title: "delivery list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

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
      res.render("delivery-list", {
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
         res.render("new-born-history", {
           result: result,
           style: "style.css",
           title: "delivery list",
         });
       })
       .catch((err) => {
         console.log(err);
       });
}

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
      res.render("new-born-history", {
        result: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addDelivery = (req, res) => {
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
          });
    }).catch((err) => {
      console.log(err);
       return res.render("delivery", {
            wrong: "something goes wrong.please, try again!",
            style: "style.css",
            script: "index.js",
          });
    });
}

exports.deliveryToLab = (req, res) => {
 
  res.render('delivery-to-lab', {
    style: 'style.css'
  });

}

exports.requestToLab = (req, res) => {
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
     message: 'request sent!'
   });
 }).catch((err) => {
   console.log(err);
   return res.status(200).render("delivery-to-lab", {
     style: "style.css",
     wrong: "something goes wrong!",
   });
 });

}

exports.getLabRequest  = (req, res) => {
  Request.findAll({ where: { To: 'lab' } }).then((result) => {
    console.log(result);
    res.status(200).render('request-to-lab', {
      style: 'style.css',
      result: result
    })
  }).catch((err) => {
    console.log(err);
  });
}