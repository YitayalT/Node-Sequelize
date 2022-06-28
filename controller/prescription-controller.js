const Prescription = require('../model/Prescription');

exports.getPrescription = (req, res) => {
    res.render('prescription', {
        style: 'user.css'
    });
}

exports.addPrescription = (req, res) => {
    let newPrescription = {
      MRN: req.body.mrn,
      UserId: req.body.uid,
      Date: req.body.date,
      DrugName: req.body.drug_name,
      Dosage: req.body.dosage,
      RouteTaken: req.body.route_taken,
      Frequency: req.body.frequency,
      AmountDispensed: req.body.amount,
    };

    Prescription.create(newPrescription).then((result) => {
        console.log('prescription added!!!');
    }).catch((err) => {
        console.log(err);
    });

    res.status(200).redirect('/getPrescription');
}