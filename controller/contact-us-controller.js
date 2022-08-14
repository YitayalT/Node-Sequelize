
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
            token: token
          });
    }).catch((err) => {
        console.log(err);
          return res.render("contact-us", {
            wrong: "something goes wrong.please, try again!",
            style: "style.css",
            script: "index.js",
            token: token
          });
    });
}