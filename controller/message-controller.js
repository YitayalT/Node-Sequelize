const Message = require('../model/Message');

exports.getMessages = async (req, res) => {
  const token = await req.cookies["access-token"];
    res.render('message', {
      style: 'style.css',
      token: token
    });
}

exports.sendMessage = async (req, res) => {
  const token = await req.cookies["access-token"];
    let newMessage = {
      messageType: req.body.message_type,
      fullName: req.body.fullName,
      MRN: req.body.mrn,
      Date: req.body.date_of_reg,
    };

    Message.create(newMessage).then((result) => {
      console.log('message added!');
       return res.render("message", {
         message: "Message sent successfully!",
         style: "style.css",
         script: "index.js",
         token: token
       });
    }).catch((err) => {
      console.log(err);
       return res.render("message", {
         wrong: "something goes wrong!",
         style: "style.css",
         script: "index.js",
         token: token
       });
    });

    // res.status(200).redirect('/getMessage');
}

exports.message = async (req, res) => {
  const token = await req.cookies["access-token"];
    Message.findAll({
        order: [["createdAt", "DESC"]],
        limit: 15
    })
      .then((result) => {
        res.render("incoming-message", {
          result: result,
          style: "style.css",
          script: "index.js",
          token: token
        });
      })
      .catch((err) => {
        console.log(err);
      });
}