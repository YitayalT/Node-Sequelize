const Sequelize = require("sequelize");
const PreventiveCare = require("../model/PreventiveCare");

exports.getPreventiveCare = async (req, res) => {
  const token = await req.cookies["access-token"];
  res.render("preventive-care", {
    style: "style.css",
    token: token
  });
};

exports.addPreventiveCare = async (req, res) => {
  const token = await req.cookies["access-token"];
    let careData = {
      MRN: req.body.mrn,
      UserId: req.body.userId,
      Pallor: req.body.pallor,
      Jaundice: req.body.jaundice,
      Chest_Abn: req.body.chest_abn,
      Heart_Abn: req.body.heart_abn,
      HIV_Test_Performed: req.body.hiv_test_performed,
      HIV_Test_result: req.body.hiv_test_result,
      Vulvar_Ulcer: req.body.vulvar_ulcer,
      vaginal_discharge: req.body.vaginal_discharge,
      pelvic_mass: req.body.pelvic_mass,
      Danger_Signs_Advised: req.body.danger_signs,
      Birth_preparedness_advised: req.body.birth_preparedness,
    };
  
  PreventiveCare.create(careData).then((result) => {
    console.log('data inserted successfully!');
     return res.render("preventive-care", {
       message: "data inserted successfully!",
       style: "style.css",
       script: "index.js",
       token: token
     });
  }).catch((err) => {
    console.log(err);
    return res.render("preventive-care", {
      wrong: "something goes wrong, try again, please",
      style: "style.css",
      script: "index.js",
      token: token
    });
  });

//  res.status(200).redirect("/preventiveCare");
}