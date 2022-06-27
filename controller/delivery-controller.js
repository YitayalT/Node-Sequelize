const Delivery = require('../model/Delivery');
exports.getDelivery = (req, res) => {
    res.render('delivery', {
        style: 'user.css',
        title: 'delivery'
    });
}

exports.addDelivery = (req, res) => {
    let newDeliveryData = {
      MRN: req.body.mrn,
      UID: req.body.user_id,
      Anc_no: req.body.anc_no,
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