const {Op} = require("sequelize");
const Client = require("../model/Client");

exports.getClient = async (req, res) => {
  const token = await req.cookies["access-token"];
   const userID = await req.cookies["userID"];
  res.render("add_client", {
      style: "style.css",
    script: "index.js",
    token: token,
    userID: userID
      
    });

};

exports.clients = async (req, res) => {
  const token = await req.cookies["access-token"];
  try {

  const { count, rows } = await Client.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit: 10,
  });
  console.log('count', count);
    // .then((result) => {
      console.log(rows);
      res.render("client_list", {
        result: rows,
        style: "style.css",
        script: "index.js",
        count: count,
        token: token
      });
    }
    catch(err){
      console.log(err);
    }
};

exports.addClient = async (req, res) => {
  const token = await req.cookies["access-token"];
  const userID = await req.cookies["userID"];
  console.log(userID);
    var yourPhone = req.body.phone;
    var phoneNo = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (yourPhone.match(phoneNo)) {
      Client.findOne({
        where: {
          [Op.or]: [{ MRN: req.body.mrn }, { Phone_no: req.body.phone }],
        },
      })
        .then((client) => {
          if (client) {
            console.log("client already exist");
            return res.render("add_client", {
              existInfo: "client already exist!",
              style: "style.css",
              script: "index.js",
              token: token,
              userID: userID
            });
          } else {
            let newClient = {
              UserId: req.body.userId,
              name_of_facility: req.body.facility_name,
              MRN: req.body.mrn,
              date_reg: req.body.date_of_reg,
              first_name: req.body.fname,
              lats_name: req.body.lname,
              Grand_Father_name: req.body.gfname,
              Age: req.body.age,
              Sex: req.body.gender,
              Email: req.body.email,
              Phone_no: yourPhone,
              Region: req.body.region,
              Woreda: req.body.city,
              Kebele: req.body.kebele,
            };
            let {
              UserId,
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
              Kebele,
            } = newClient;

            Client.create({
              UserId,
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
              Kebele,
            })
              .then((data) => {
                console.log("client registered successfully!");
                return res.render("add_client", {
                  message: "client registered successfully!",
                  style: "style.css",
                  script: "index.js",
                  token: token,
                  userID: userID
                });
              })
              .catch((err) => {
                console.log(err);
                return res.render("add_client", {
                  wrong: "something goes wrong. please, try again!",
                  style: "style.css",
                  script: "index.js",
                  token: token,
                  userID: userID
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.render("contact-us", {
            wrong: "something goes wrong!",
            style: "style.css",
            script: "index.js",
            token: token,
            userID: userID
          });
        });
    } else {
      return res.render("add_client", {
        wrong: "Phone Number Not in the correct format. Try again please",
        style: "style.css",
        token: token,
        userId: userID
      });
    }
  
  
};

exports.search = async (req, res) => {
  const token = await req.cookies["access-token"];
  let  query  = req.body.mrn;
  console.log(query);
    
  Client.findAll({
    where: {
      [Op.or]: [
        { MRN: query },
        { first_name:  query } ,
        { Phone_no:  query } ,
      ],
    },
    raw: true,
  })
    .then((result) => {
      res.render("client_list", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.edit = async (req, res) => {
  const token = await req.cookies["access-token"];
  const id = req.params.id;
  Client.findOne({
    where: { MRN: id },
    raw: true,
  })
    .then((client) => {
      // console.log(client);
      res.render("edit_client", {
        client: client,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateClient = (req, res) => {
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
    Email: req.body.email,
    Phone_no: req.body.phone,
    Region: req.body.region,
    Woreda: req.body.city,
    Kebele: req.body.kebele,
  };

  Client.update(newClient, {
    where: { MRN: id },
  })
    .then((data) => {
      console.log("updated!");
      //  res.redirect('add_client');
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).redirect("/clients");
};

exports.deleteClient =   (req, res) => {
  let id = req.params.id;
  Client.findByPk(id).then((result) => {
      Client.destroy({ where: { MRN: id } });
  res.status(200).redirect("/clients");
    console.log('deleted successfully!');
  }).catch((err) => {
    console.log(err);
    res.status(200).redirect("/clients");
  });

};


exports.clientList = async (req, res) => {
 try {

  const { count, rows } = await Client.findAndCountAll({
    order: [["createdAt", "DESC"]],
    
  });
   
  console.log('count', count);
    // .then((result) => {
      console.log(rows);
    res.json(rows);
    }
    catch(err){
      console.log(err);
    }
}


exports.mobileRegister = (req, res) => {
   Client.findOne({
     where: { [Op.or]: [{ MRN: req.body.mrn }, { Phone_no: req.body.phone }] },
   })
     .then((client) => {
       if (client) {
         console.log("client already exist");
         return res.status(401).json({
           message: "client already exist!",
         });
       } else {
         let newClient = {
           UserId: req.body.userId,
           name_of_facility: req.body.facility_name,
           MRN: req.body.mrn,
           date_reg: req.body.date_of_reg,
           first_name: req.body.fname,
           lats_name: req.body.lname,
           Grand_Father_name: req.body.gfname,
           Age: req.body.age,
           Sex: req.body.gender,
           Email: req.body.email,
           Phone_no: req.body.phone,
           Region: req.body.region,
           Woreda: req.body.city,
           Kebele: req.body.kebele,
         };
         let {
           UserId,
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
           Kebele,
         } = newClient;

         Client.create({
           UserId,
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
           Kebele,
         })
           .then((data) => {
             console.log("client registered successfully!");
             return res.status(200).json({
               message: "client registered successfully!",
             });
           })
           .catch((err) => {
             console.log(err);
             return res.status(200).json({
               message: "something goes wrong!",
             });
           });
       }
     })
     .catch((err) => {
       console.log(err);
       
      return res.status(201).json({
        message: "something goes wrong!",
      });
     });

}; 

