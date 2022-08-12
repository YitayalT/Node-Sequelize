require("dotenv").config();
const User = require("../model/User");
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Feedback = require('../model/Feedback');

exports.getUser = async (req, res) => {
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
      count: count
    });
  }  catch(err) {
        console.log(err);
      }
  }

exports.goToHmis = (req, res) => {
  res.render('hmis');
}

exports.search = async (req, res) => {
  
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
    });
    // })
  } catch(err){
      console.log(err);
    }
};

exports.usersAdd = (req, res) => {
    res.render("create_user", {
      style: "style.css",
      script: 'addUser.js'
    });
  }


exports.addUser = (req, res) => {
   User.findOne({ where: { email: req.body.email } }).then((user) => {
     if (user) {
         console.log('user already exist');
          return res.render("create_user", {
            existInfo: "user already exist!",
            style: "style.css",
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
              ward: req.body.ward,
              wardCode: req.body.wardCode
            };

            User.create(newUser)
              .then((result) => {
                console.log("user registered successfully!");
                return res.render("create_user", {
                  message: "user registered successfully!",
                  style: "style.css",
                });
                  
              })
              .catch((err) => {
                console.log(err);
                return res.render("create_user", {
                  wrong: "something goes wrong, please try again!",
                  style: "style.css",
                });
              });
      }
        
   }).catch((err) => {
     console.log(err);
     return res.render("create_user", {
       wrong: "something goes wrong, please try again!",
       style: "style.css",
     });
    });
}

exports.getLoggedIn = (req, res) => {
  res.render('login', {
    style: 'style.css',
    validate: 'user.css',
   
  });
}

exports.login = (req, res) => {
    User.findOne({ where: { user_name: req.body.uname } }).then((user) => {
        if (!user) {
             res.status(401).render("login", {
               message: "User not found",
               userName: "user name is required",
               password: "password is required",
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
                         res.render("physician-role", {
                           style: "style.css",
                         });
                       } else {
                         res.status(401).render("login", {
                           message: "No such role",
                           style: "style.css",
                           validate: "user.css",
                         });
                       }
                     } else {
                       res.status(401).render("login", {
                         message: "Incorrect credentials",
                         style: "style.css",                        
                         validate: "user.css",
                       });
                     }
                  } else {
                      res.status(401).render("login", {
                        message: "Not authenticated",
                        style: "style.css",
                         validate: "user.css",
                      });
                   }
                   
                 } else {
                   res.status(401).render("login", {
                     message: "Incorrect Password",
                     style: 'style.css',
                     
                     validate: 'user.css'
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

exports.deleteUser = (req, res) => {
  let id = req.params.id;
  User.destroy({ where: { user_id: id }});
  res.status(200).redirect("/users");
}

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
           });
        }
  }).catch((err) => {
    console.log(err);
  });

}


exports.editUser = (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: { user_id: id },
    raw: true,
  }).then((user) => {
    console.log(user);
    res.render('edit-user', {
      style: 'style.css',
      user: user
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

 
