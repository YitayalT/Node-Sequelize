
const Feedback = require('../model/Feedback');
exports.contactUs = (req, res) => {
    res.render('contact-us',{
    style: "style.css",
  });
}

exports.giveFeedback = (req, res) => {
    let feedback = {
      FullName: req.body.name,
      Email: req.body.email,
      phone: req.body.phone,
      feedback: req.body.feedback,
    };
    
    Feedback.create(feedback).then((result) => {
          console.log("data submitted successfully!");
          return res.render("contact-us", {
            message: "data submitted successfully!",
            style: "style.css",
            script: "index.js",
          });
    }).catch((err) => {
        console.log(err);
          return res.render("contact-us", {
            wrong: "something goes wrong.please, try again!",
            style: "style.css",
            script: "index.js",
          });
    });
}