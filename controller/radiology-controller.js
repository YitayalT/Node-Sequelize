const Radiology = require('../model/Radiology');
const User = require('../model/User');
const Client = require("../model/Client");
exports.getRadiology = (req, res) => {
    res.render('radiology-exam', {
        style: 'style.css'
    });
}

exports.radiologyResult = (req, res) => {
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
          res.render("radiology-result", {
            result: result,
            style: "style.css",
            script: "index.js",
          });
      })
      .catch((err) => {
        console.log(err);
      });

};

 exports.radiologySearch = (req, res) => {
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
       res.render("radiology-result", {
         result: result,
         style: "style.css",
       });
     })
     .catch((err) => {
       console.log(err);
     });
 };

exports.addRadiology = (req, res) => {
    let newRadiologyData = {
      MRN: req.body.mrn,
      UserId: req.body.uid,
      DateOfExam: req.body.date,
      TypeOfExam: req.body.exam_type,
      Technique: req.body.technique,
      Impression: req.body.impression,
      Finding: req.body.finding,
    };

    Radiology.create(newRadiologyData).then((result) => {
        console.log('radiology added!!!');
    }).catch((err) => {
        console.log(err);
    });

    res.status(200).redirect('/Radiology');
}