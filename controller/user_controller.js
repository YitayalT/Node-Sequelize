const Sequelize = require("sequelize");
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.getUser = (req, res) => {
    User.findAll().then((user) => {
        res.render('users', {
            user: user
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.usersAdd = (req, res) => {
    res.render('create_user', {
        style: 'user.css',
        script: 'index.js'
    });
}

exports.addUser = (req, res) => {
    // const hashedPassword = bcrypt.hashSync(req.body.password, 8);
   User.findOne({ where: { email: req.body.email } }).then((user) => {
       if (user) {
          console.log("user already exists!");
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
              })
              .catch((err) => {
                console.log(err);
              });
      }
        
   }).catch((err) => {
        console.log(err);
    });
   
   return res.redirect("/addUser");
}

exports.login = (req, res) => {
    User.findOne({ where: { user_name: req.body.uname } }).then((user) => {
        if (!user) {
            console.log('user not found');
        } else {
            if (req.body.role === user.role) {
                        bcrypt.compare(
                          req.body.password,
                          user.password,
                          (error, result) => {
                            if (result) {
                              const token = jwt.sign(
                                {
                                  user_name: user.user_name,
                                      password: user.password,
                                  
                                },
                                "secret",
                                (er, token) => {
                                  console.log(token);
                                  console.log("Authenticated!");
                                  res.status(200).json({
                                    message: "success",
                                    token: token,
                                  });
                                }
                              );
                            } else {
                              console.log("failed to login!");
                            }
                          }
                        ); 
            } else {
                console.log('not authorized!');
                 }      
             }
    }).catch((err) => {
        console.log(err);
    });
}