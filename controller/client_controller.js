const Sequelize = require("sequelize");
const Client = require("../model/Client");
exports.getClient = (req, res) => {
  res.render("add_client", {
    style: "user.css",
    script: "index.js",
  });
};
exports.clients = (req, res) => {
  Client.findAll({
    order: [["createdAt", "DESC"]],
    limit: 10,
  })
    .then((result) => {
      res.render("client_list", {
        result: result,
        style: "user.css",
        script: "index.js",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addClient = (req, res) => {
  Client.findOne({ where: { MRN: req.body.mrn } })
    .then((client) => {
      if (client) {
        console.log("client already exist");
        return res.render("add_client", {
          existInfo: "client already exist!",
          style: "user.css",
          script: "index.js",
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
            return res.render("add_client", {
              message: "client registered successfully!",
              style: "user.css",
              script: "index.js",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    }); //  res.status(200).redirect("/addClient");
};

exports.search = (req, res) => {
  let  mrn  = req.body.mrn;
  console.log(mrn);
  // term = term.toLowerCase();
  Client.findOne({
    where: {
    MRN: mrn
  }})
    .then((result) => {
      res.render("client_list", {
        result: result,
        style: 'user.css'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;
  Client.findOne({
    where: { MRN: id },
    raw: true,
  })
    .then((client) => {
      console.log(client);
      res.render("edit_client", {
        client: client,
        style: "user.css",
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
//   let {
//     name_of_facility,
//     MRN,
//     date_reg,
//     first_name,
//     lats_name,
//     Grand_Father_name,
//     Age,
//     Sex,
//     Email,
//     Phone_no,
//     Region,
//     Woreda,
//     Kebele,
//   } = newClient;

  Client.update(newClient, {
    where: { MRN: id },
  })
    .then((data) => {
      console.log("registered!");
      //  res.redirect('add_client');
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).redirect("/clients");
};
