require("dotenv").config();
const User = require("../model/User");
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Feedback = require('../model/Feedback');
const Client = require('../model/Client');

exports.getUser = async (req, res) => {
  const token = await req.cookies["access-token"];
  try {
    const { count, rows } = await User.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    // .then((user) => {
    console.log('count', count);
    
    // console.log(rows.Sex);
     res.render("users", {
      user: rows,
      style: "style.css",
      count: count,
      token: token
    });
  }  catch(err) {
        console.log(err);
      }
  }

exports.goToHmis =  async (req, res) => {
  const token = await req.cookies["access-token"];
  try {
     const { count, rows } = await Client.findAndCountAll({
       order: [["createdAt", "DESC"]],
       limit: 10,
     });
    res.render("hmis", {
      style: "style.css",
      rows: rows,
      token: token,
      ward: "Total Clients",
      count: count,
    });
  } catch (error) {
    
  }
  
}

exports.search = async (req, res) => {
  const token = await req.cookies["access-token"];
  try {
    let query = req.body.users;
    // console.log(query);
    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [{ user_id: query }, { first_name: query }, { role: query },{user_name: query}, {Sex:query},{department: query}],
      },
      raw: true,
    });
    // .then((result) => {
    res.render("users", {
      user: rows,
      style: "style.css",
      count: count,
      token: token
    });
    // })
  } catch(err){
      console.log(err);
    }
};

exports.usersAdd = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
    res.render("create_user", {
      style: "style.css",
      script: 'addUser.js',
      token: token,
  
    });
  }


exports.addUser = async (req, res) => {
  const token = await req.cookies["access-token"];
   var yourPhone = req.body.phone;
    var phoneNo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if (yourPhone.match(phoneNo)) {
    User.findOne({
      where: {
        [Op.or]: [
          { user_name: req.body.uname },
          { Email: req.body.email },
          { Phone_no: yourPhone },
        ],
      },
    })
      .then((user) => {
        if (user) {
          console.log("user already exist");
          return res.render("create_user", {
            wrong: "user already exist!",
            style: "style.css",
            token: token
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
            Phone_no: yourPhone,
            password: bcrypt.hashSync(req.body.password, 8),
            department: req.body.department,
            specialization: req.body.specialization,
            role: req.body.role,
            ward: req.body.ward,
            wardCode: req.body.wardCode,
          };

          User.create(newUser)
            .then((result) => {
              console.log("user registered successfully!");
              return res.render("create_user", {
                message: "user registered successfully!",
                style: "style.css",
                token: token
              });
            })
            .catch((err) => {
              console.log(err);
              return res.render("create_user", {
                wrong: "something goes wrong, please try again!",
                style: "style.css",
                token: token
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.render("create_user", {
          wrong: "something goes wrong, please try again!",
          style: "style.css",
          token: token
        });
      });
  } else {
     return res.render("create_user", {
       wrong: "Phone Number Not in the correct format. Try again please",
       style: "style.css",
       token: token
     });
  }  
}

exports.getLoggedIn =  (req, res) => {
  res.render('login', {
    style: 'style.css',
    validate: 'user.css',    
  });
}

exports.login = async (req, res) => {
  const token = await req.cookies["access-token"];
   const userID = await req.cookies["userID"];
    User.findOne({ where: { user_name: req.body.uname } }).then((user) => {
        if (!user) {
             res.status(401).render("login", {
               message: "User not found",
               style: "style.css",
               token: token
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
                           token: token
                         });
                       } else if (user.role === process.env.RL_RECEPTION) {
                         //  console.log(token);
                         console.log("Receptionist Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.cookie("userID", user.user_id);
                        //  res.status(200).redirect("/addClient");
                          res.status(200).render("add_client", {
                            style: "style.css",
                            script: "index.js",
                            token: token,
                            userID: user.user_id
                          });
                         
                       } else if (user.role === process.env.RL_ADMIN) {
                         // console.log(token);
                         console.log("Admin Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                        //  res.status(200).redirect("/addUser");
                         res.cookie("userID", user.user_id);
                         res.status(200).render("create_user", {
                           style: "style.css",
                           script: "index.js",
                           token: token,
                           
                         });
                       } else if (user.role === process.env.RL_LABORATORY) {
                         //  console.log(token);
                         console.log("Laboratorist Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.cookie("userID", user.user_id);
                        //  res.status(200).redirect("/labExam");
                           res.status(200).render("lab-exam", {
                             style: "style.css",
                             script: "index.js",
                             token: token,
                             userID: user.user_id,
                           });
                         
                       } else if (user.role === process.env.RL_RADIOLOGY) {
                         //  console.log(token);
                         console.log("Radiology Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                        //  res.status(200).redirect("/Radiology");
                          res.cookie("userID", user.user_id);
                          //  res.status(200).redirect("/labExam");
                          res.status(200).render("radiology-exam", {
                            style: "style.css",
                            script: "index.js",
                            token: token,
                            userID: user.user_id,
                          });
                       } else if (user.role === process.env.RL_PHARMACY) {
                         //  console.log(token);
                         console.log("Pharmacist Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/Prescription");
                         res.cookie("userID", user.user_id);
                       } else if (user.role === process.env.RL_HMIS) {
                         //  console.log(token);
                         console.log("HMIS Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         res.status(200).redirect("/hmis");
                       } else if (user.role === process.env.RL_MIDWIFE) {
                         console.log("midwife Authenticated!");
                         res.cookie("access-token", token, {
                           maxAge: 60 * 60 * 24 * 1000,
                         });
                         //  res.status(200).redirect("/ward");
                         res.cookie("userID", user.user_id);
                         res.render("physician-role", {
                           style: "style.css",
                           token: token
                         });
                       } else {
                         res.status(401).render("login", {
                           message: "No such role",
                           style: "style.css",
                           validate: "user.css",
                           token: token
                         });
                       }
                     } else {
                       res.status(401).render("login", {
                         message: "Incorrect credentials",
                         style: "style.css",                        
                         validate: "user.css",
                         token: token
                       });
                     }
                  } else {
                      res.status(401).render("login", {
                        message: "Not authenticated",
                        style: "style.css",
                         validate: "user.css",
                         token: token
                      });
                   }
                   
                 } else {
                   res.status(401).render("login", {
                     message: "Incorrect Password",
                     style: 'style.css',
                     validate: 'user.css',
                     token: token
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

  res.cookie("userID", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/login");
  console.log('successfully logged out');
};

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  User.destroy({ where: { user_id: id }});
  res.status(200).redirect("/users");
}

exports.feedback = async (req, res) => {
  const token = await req.cookies["access-token"];
  Feedback.findAll({
    order: [["createdAt", "DESC"]],
    limit: 10,
  }).then((result) => {
     res.render("feedback", {
       user: result,
       style: "style.css",
       token: token
     });
  }).catch((err) => {
    console.log(err);
  });
}


exports.ward = async (req, res) => {
  const token = await req.cookies["access-token"];
  res.render('physician-role', {
    style: 'style.css',
    token: token
  });
}

exports.goToWard = async (req, res) => {
  const token = await req.cookies["access-token"];
  
  User.findOne({ where: { wardCode: req.body.wardCode } }).then((user) => {
        if (!user) {
          res.status(401).render("physician-role", {
            message: "Invalid ward Code!",
            style: "style.css",
            token: token
          });
        } else if (user.ward === process.env.WARD_PNC && req.body.ward === process.env.WARD_PNC) {
          console.log(user.ward);
          res.status(200).redirect("/getPnc");
        } else if (user.ward === process.env.WARD_ANC && req.body.ward ===  process.env.WARD_ANC) {
          res.status(200).redirect("/classifying");
        } else if (user.ward ===  process.env.WARD_DELIVERY && req.body.ward === process.env.WARD_DELIVERY) {
          res.status(200).redirect("/getDelivery");
        } else {
           res.status(401).render("physician-role", {
             message: "Incorrect credentials!",
             style: "style.css",
             token: token
           });
        }
  }).catch((err) => {
    console.log(err);
  });

}


exports.editUser = async (req, res) => {
  const token = await req.cookies["access-token"];
  const id = req.params.id;
  User.findOne({
    where: { user_id: id },
    raw: true,
  }).then((user) => {
    console.log(user);
    res.render('edit-user', {
      style: 'style.css',
      user: user,
      token: token
    })
  }).catch((err) => {
    console.log(err);
  });;
}

exports.updateUser = (req, res) => {
  const id = req.params.id;
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
    ward: req.body.ward,
    wardCode: req.body.wardCode,
  };
  User.update(newUser,{
    where: {
    user_id: id
  }
}).then((result) => {
  console.log('updated!');
}).catch((err) => {
  console.log(err);
});
   res.status(200).redirect("/users");
}



exports.mobileAuth = (req, res) => {
 
  User.findOne({ where: { user_name: req.body.uname } })
    .then((user) => {
      if (!user) {
       return res.status(401).json({
           message: "User not found!",         
         });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
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
                  if (user.role === process.env.RL_RECEPTION) {
                     console.log('token is:',token, 'end here');
                    console.log("receptionist Authenticated!");
                    res.cookie("access-token", token, {
                      maxAge: 60 * 60 * 24 * 1000,
                    });
                    //  res.status(200).redirect("/ward");
                    return res.status(200).json({
                      user: user,
                    });
                  } else {
                    return res.status(401).json({
                      message: "Incorrect Credentials!",
                      error: error,
                    });
                  }
                } else {
                  return res.status(401).json({
                    message: "User not found!",
                  });
              
                }
              } else {
                return res.status(401).json({
                  message: "token not found!",
             
                });
              }
            } else {
               return res.status(401).json({
                 message: "Incorrect password !",
                 
               });
            }
          })
          .catch((err) => {
            //  res.status(401).render("login", {
            //    message: "something goes wrong",
            //    style: "user.css",
            //  });
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

 
exports.mobileFeedback = async (req, res) => {
  // const token = await req.cookies["access-token"];
  Feedback.findAll({
    order: [["createdAt", "DESC"]],
    
  })
    .then((result) => {
      res.status(200).json(result,);
    })
    .catch((err) => {
      console.log(err);
    });
};