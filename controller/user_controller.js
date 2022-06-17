const Sequelize = require("sequelize");
const User = require("../model/User");

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
        style: 'user.css'
    });
}

exports.addUser = (req, res) => {
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
      password: req.body.password,
      department: req.body.department,
      specialization: req.body.specialization,
      role: req.body.role,
    };

    User.create(newUser).then((result) => {
        console.log('user registered successfully!');
    }).catch((err) => {
       console.log(err); 
    });
    res.redirect('/');
}