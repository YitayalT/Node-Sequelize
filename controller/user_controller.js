const Sequelize = require("sequelize");
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


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

exports.getLoggedIn = (req, res) => {
  res.render('login', {
    style: 'user.css'
  });
}

exports.login = (req, res) => {
    User.findOne({ where: { user_name: req.body.uname } }).then((user) => {
        if (!user) {
            console.log('user not found');
        } else {
          let reqPass = req.body.password;
          console.log(reqPass);
          let userPass = user.password;
          console.log(userPass);
              bcrypt.compare(req.body.password, user.password).then((result) => {
                 if (result) {
                 const token = jwt.sign({
                       user_name: user.user_name,
                       password: user.password,
                 }, "secret");
                   
                   if (token) {
                     if (req.body.role === "doctor") {
                       console.log(token);
                       console.log("Doctor Authenticated!");
                       res.cookie("access-token", token, {
                         maxAge: 60 * 60 * 24 * 1000,
                       });
                       res.status(200).redirect("/addUser");
                     } else if (req.body.role === "receptionist") {
                       console.log(token);
                       console.log("Receptionist Authenticated!");
                       res.cookie("access-token", token, {
                         maxAge: 60 * 60 * 24 * 1000,
                       });
                       res.status(200).redirect("/addClient");
                     } else {
                       res.status(501).json({
                         message: "Incorrect role",
                       });
                     }
                   } else {
                     console.log('no token exist');
                   }
                   
                 } else {
                   res.status(400).json({
                     message: 'Incorrect password'
                   });
                 } 
              }).catch((err) => {
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
};