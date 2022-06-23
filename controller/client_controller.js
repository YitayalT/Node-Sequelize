const Sequelize = require('sequelize');
const Client = require('../model/Client');
exports.getClient =  (req, res) =>{
  res.render("client-register", {
      style: "user.css",
      script: 'index.js'
  });
    
}
exports.clients = (req, res) =>{
    Client.findAll().then( (result) =>{
        res.render("client-register", {
          result: result,
          style: "style.css",
          script: "index.js",
        });
    }).catch( (err) =>{
        console.log(err);
    });
}
exports.addClient = (req, res) =>{
    // res.render('add_client') ;
    let newClient = {
        name_of_facility: req.body.facility_name,
        MRN: req.body.mrn,
        date_reg: req.body.date_of_reg,
        first_name: req.body.fname,
        lats_name: req.body.lname,
        Grand_Father_name: req.body.gfname,
        Age: req.body.age,
        Sex: req.body.gender,
        Email:req.body.email,
        Phone_no:req.body.phone,
        Region: req.body.region,
        Woreda: req.body.city,
        Kebele: req.body.kebele
    }
    let {name_of_facility, MRN, date_reg, first_name, lats_name, Grand_Father_name, Age,
    Sex, Email, Phone_no, Region, Woreda, Kebele} = newClient;

    Client.create({
        name_of_facility,
        MRN,
        date_reg,
        first_name,
        lats_name,
        Grand_Father_name,
        Age,
        Sex,
        Email,
        Phone_no, 
        Region,
        Woreda,
        Kebele
    }).then( (data) =>{
     console.log('registered!');
    
    }).catch( (err) =>{
        console.log(err);
    });
     res.status(200).redirect("/addClient");
}

exports.search = (req, res) =>{
    let { mrn } = req.query;
   // term = term.toLowerCase();
   Client.findByPk(mrn)
    .then( (result) =>{
        res.render('client_list', {
            result: result
        });
    })
    .catch((err) =>{
   console.log(err);
    });
}


exports.edit = (req, res) =>{
    const id = req.params.id;
  Client.findOne({
    where:{MRN:id},
    raw:true
}).then( (client) =>{
console.log(client);
   res.render("edit_client", { client: client });   
}).catch( (err) =>{
        console.log(err);
});  
}

exports.updateClient = (req, res) =>{
    const id = req.params.id;
    let newClient = {
        name_of_facility: req.body.facility_name,
        MRN: req.body.mrn,
        date_reg: req.body.date_of_reg,
        first_name: req.body.fname,
        lats_name: req.body.lname,
        Grand_Father_name: req.body.gfname,
        Age: req.body.age,
        Sex: req.body.gender,
        Email:req.body.email,
        Phone_no:req.body.phone,
        Region: req.body.region,
        Woreda: req.body.city,
        Kebele: req.body.kebele
    }
    let {name_of_facility, MRN, date_reg, first_name, lats_name, Grand_Father_name, Age,
    Sex, Email, Phone_no, Region, Woreda, Kebele} = newClient;

    Client.update(newClient,{
        where:{MRN:id}
    }).then( (data) =>{
     console.log('registered!');
    //  res.redirect('add_client');
    }).catch( (err) =>{
        console.log(err);
    });
    res.status(200).redirect("/clients");
}