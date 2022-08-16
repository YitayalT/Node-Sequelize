const NewBorn = require("../model/NewBorn");

exports.getNewBorn = async (req, res) => {
  const userID = await req.cookies["userID"];
  const token = await req.cookies["access-token"];
    res.render('new-born', {
      style: 'style.css',
      token: token,
      userID: userID
    });
}


exports.addNewborn = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
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
      Status: req.body.status,
    };

    NewBorn.create(newBornData).then((result) => {
        // console.log(result);
        console.log('new newBorn data added!!!');
          return res.render("new-born", {
            message: "data added successfully",
            style: "style.css",
            script: "index.js",
            token: token,
            userID: userID
          });

    }).catch((err) => {
        console.log(err);
          return res.render("new-born", {
            wrong: "something goes wrong!",
            style: "style.css",
            script: "index.js",
            token: token,
            userID: userID
          });
    });
}
