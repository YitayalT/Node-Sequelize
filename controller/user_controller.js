require("dotenv").config();
const User = require("../model/User");
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Feedback = require('../model/Feedback');

exports.getUser = (req, res) => {
    User.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    })
      .then((user) => {
        res.render("users", {
          user: user,
          style: "style.css",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


exports.search = (req, res) => {
  let query = req.body.users;
  console.log(query);

  User.findAll({
    where: {
      [Op.or]: [{ user_id: query }, { first_name: query }, {role: query}],
    },
    raw: true,
  })
    .then((result) => {
      res.render("users", {
        user: result,
        style: "style.css",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.usersAdd = (req, res) => {
    res.render("create_user", {
      style: "style.css",
      script: "index.js",
    });
  }


exports.addUser = (req, res) => {
   User.findOne({ where: { email: req.body.email } }).then((user) => {
     if (user) {
         console.log('user already exist');
          return res.render("create_user", {
            existInfo: "user already exist!",
            style: "style.css",
            script: "index.js",
          });
       } else {
            let newUser = {
              user_id: req.body.uid,
              first_name: req.body.fname,
              last_name: req.body.lname,
              user_name: req.body.uname,
              City: req.body.city,
              Age: req.body.age,
              Sex: req.body.gender,
              Email: req.body.email,
              Phone_no: req.body.phone,
              password: bcrypt.hashSync(req.body.password, 8),
              department: req.body.department,
              specialization: req.body.specialization,
              role: req.body.role,
            };

            User.create(newUser)
              .then((result) => {
                console.log("user registered successfully!");
                return res.render("create_user", {
                  message: "user registered successfully!",
                  style: "style.css",
                  script: "index.js",
                });
                  
              })
              .catch((err) => {
                console.log(err);
              });
      }
        
   }).catch((err) => {
        console.log(err);
    });
}

exports.getLoggedIn = (req, res) => {
  res.render('login', {
    style: 'style.css'
  });
}

exports.login = (req, res) => {
    User.findOne({ where: { user_name: req.body.uname } }).then((user) => {
        if (!user) {
             res.status(401).render("login", {
               message: "User not found",
               style: "style.css",
             });
        } else {
              bcrypt.compare(req.body.password, user.password).then((result) => {
                 if (result) {
               let token = jwt.sign(
                 {
                   user_name: user.user_name,
                   password: user.password,
                 },
                 process.env.JWT_SECRET_KEY
               );
                   
                   if (token) {
                     if (req.body.role === user.role) {
                       if (user.role === process.env.RL_DOCTOR) {
                         //  console.log(token);
                         console.log("Doctor Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                        //  res.status(200).redirect("/ward");
                         res.render("physician-role", {
                           style: "style.css",
                           user_name: user.user_name,
                         });
                       } else if (user.role === process.env.RL_RECEPTION) {
                         //  console.log(token);
                         console.log("Receptionist Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/addClient");
                         
                       } else if (user.role === process.env.RL_ADMIN) {
                         // console.log(token);
                         console.log("Admin Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/addUser");
                       } else if (user.role === process.env.RL_LABORATORY) {
                         //  console.log(token);
                         console.log("Laboratorist Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/labExam");
                         
                       } else if (user.role === process.env.RL_RADIOLOGY) {
                         //  console.log(token);
                         console.log("Radiology Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/Radiology");
                       } else if (user.role === process.env.RL_PHARMACY) {
                         //  console.log(token);
                         console.log("Pharmacist Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/Prescription");
                       } else if (user.role === process.env.RL_MIDWIFE) {
                         console.log("midwife Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         //  res.status(200).redirect("/ward");
                         res.render("physician-role", {
                           style: "style.css",
                         });
                       } else {
                         res.status(401).render("login", {
                           message: "No such role",
                           style: "style.css",
                         });
                       }
                     } else {
                       res.status(401).render("login", {
                         message: "Incorrect credentials",
                         style: "style.css",
                       });
                     }
                   } else {
                      res.status(401).render("login", {
                        message: "Not authenticated",
                        style: "style.css",
                      });
                   }
                   
                 } else {
                   res.status(401).render("login", {
                     message: "Incorrect Password",
                     style: 'style.css'
                   });
                 } 
              }).catch((err) => {
                //  res.status(401).render("login", {
                //    message: "something goes wrong",
                //    style: "user.css",
                //  });
                console.log(err);
              });     
             }
    }).catch((err) => {
        console.log(err);
    });
}


exports.logout = async (req, res) => {
  res.cookie("access-token", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/login");
  console.log('successfully logged out');
};

// exports.deleteUser = (req, res) => {
//   let id = req.params.mrn;
//   User.destroy({ where: { user_id: id } }).then((result) => {
//     console.log('deleted!');
//   }).catch((err) => {
//     console.log(err);
//   });
//   res.status(200).redirect("/users");
// }

exports.feedback = (req, res) => {
  Feedback.findAll({
    order: [["createdAt", "DESC"]],
    limit: 10,
  }).then((result) => {
     res.render("feedback", {
       user: result,
       style: "style.css",
     });
  }).catch((err) => {
    
  });
}


exports.ward = (req, res) => {
  res.render('physician-role', {
    style: 'style.css',  
  });
}

exports.goToWard = (req, res) => {
  User.findOne({ where: { wardCode: req.body.wardCode } }).then((user) => {
        if (!user) {
          res.status(401).render("physician-role", {
            message: "Invalid ward Code!",
            style: "style.css",
          });
        } else if (user.ward === "pnc" && req.body.ward === "pnc") {
          res.status(200).redirect("/getPnc");
        } else if (user.ward === "anc" && req.body.ward === "anc") {
          res.status(200).redirect("/classifying");
        } else if (user.ward === "delivery" && req.body.ward === "delivery") {
          res.status(200).redirect("/getDelivery");
        } else {
           res.status(401).render("physician-role", {
             message: "Incorrect credentials!",
             style: "style.css",
           });
        }
  }).catch((err) => {
    console.log(err);
  });

}