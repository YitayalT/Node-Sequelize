const NewBorn = require("../model/NewBorn");

exports.getNewBorn = (req, res) =>{
    res.render('new-born', {
        style: 'style.css'
    });
}


exports.addNewborn = (req, res) => {
    let newBornData = {
      UID: req.body.user_id,
      MRN: req.body.mrn,
      babyId: req.body.baby_id,
      time: req.body.born_time,
      firstName: req.body.fName,
      fatherName: req.body.lName,
      sex: req.body.gender,
      birthWeight: req.body.weight,
      birthHeight: req.body.height,
      cephalicCircumference: req.body.cepha_circ,
      stillBirth: req.body.stillBirth,
      alive: req.body.alive,
      died: req.body.died,
      Ointment: req.body.ointment,
      BCGVaccine: req.body.BCGVaccine,
      PolioVaccine: req.body.PolioVaccine,
      HepatitisB: req.body.HepatitisB,
      VitaminK: req.body.VitaminK,
      Chlorhexidine: req.body.Chlorhexidine,
    };

    NewBorn.create(newBornData).then((result) => {
        // console.log(result);
        console.log('new newBorn data added!!!');
          return res.render("new-born", {
            message: "data added successfully",
            style: "style.css",
            script: "index.js",
          });

    }).catch((err) => {
        console.log(err);
          return res.render("new-born", {
            wrong: "something goes wrong!",
            style: "style.css",
            script: "index.js",
          });
    });
}
