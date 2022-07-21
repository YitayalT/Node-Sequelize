const Prescription = require('../model/Prescription');
const User = require('../model/User');
const Client = require('../model/Client');
const {Op} = require('sequelize');
exports.getPrescription = (req, res) => {
    res.render('prescription', {
        style: 'style.css'
    });
}

exports.prescription = (req, res) => {
     Prescription.findAll({
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
         res.render("new-prescription", {
           result: result,
           style: "style.css",
           script: "index.js",
         });
       })
       .catch((err) => {
         console.log(err);
       });
 }

 exports.prescriptionSearch = (req, res) => {
   let query = req.body.mrn;
   console.log(query);

   Prescription.findAll({
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
       res.render("new-prescription", {
         result: result,
         style: "style.css",
       });
     })
     .catch((err) => {
       console.log(err);
     });
 };


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
         return res.render("prescription", {
           message: "prescribed successfully!",
           style: "style.css",
           script: "index.js",
         });
    }).catch((err) => {
      console.log(err);
       return res.render("prescription", {
         wrong: "something goes wrong. please, try again",
         style: "style.css",
         script: "index.js",
       });
    });
}

