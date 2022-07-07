const Radiology = require('../model/Radiology');
exports.getRadiology = (req, res) => {
    res.render('radiology-exam', {
        style: 'style.css'
    });
}

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