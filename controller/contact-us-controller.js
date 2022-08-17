
const Feedback = require('../model/Feedback');
exports.contactUs = async (req, res) => {
  const token = await req.cookies["access-token"];
    res.render('contact-us',{
      style: "style.css",
      token: token
  });
}

exports.giveFeedback = async (req, res) => {
  const token = await req.cookies["access-token"];
  const yourPhone = req.body.phone;
   var phoneNo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if (yourPhone.match(phoneNo)) {
     let feedback = {
       FullName: req.body.name,
       Email: req.body.email,
       phone: yourPhone,
       feedback: req.body.feedback,
     };

     Feedback.create(feedback)
       .then((result) => {
         console.log("data submitted successfully!");
         return res.render("contact-us", {
           message: "data submitted successfully!",
           style: "style.css",
           script: "index.js",
           token: token,
         });
       })
       .catch((err) => {
         console.log(err);
         return res.render("contact-us", {
           wrong: "something goes wrong.please, try again!",
           style: "style.css",
           script: "index.js",
           token: token,
         });
       });
  } else {
    return res.render("contact-us", {
      wrong: "something goes wrong.please, try again!",
      style: "style.css",
      script: "index.js",
      token: token,
    });
  }
   
}

exports.sendFeedback = async (req, res) => {
  const token = await req.cookies["access-token"];
  let feedback = {
    FullName: req.body.name,
    Email: req.body.email,
    phone: req.body.phone,
    feedback: req.body.feedback,
  };

  Feedback.create(feedback)
    .then((result) => {
      console.log("data submitted successfully!");
      res.status(200).json({
        message: 'thanks for your valuable feedback!'
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: 'error'
      })
    });
};