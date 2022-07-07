const Delivery = require('../model/Delivery');
const User = require('../model/User');
const Client = require('../model/Client');
const NewBorn = require('../model/NewBorn');

exports.getDelivery = (req, res) => {
    res.render('delivery', {
        style: 'home.css',
        title: 'delivery'
    });
}

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
        style: "home.css",
        title: "delivery list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

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
           style: "home.css",
           title: "delivery list",
         });
       })
       .catch((err) => {
         console.log(err);
       });
}


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
    }).catch((err) => {
        console.log(err);
    });

    res.status(200).redirect("/getDelivery");


}