const Client = require('../model/Client');
const User = require('../model/User');
const ANCVisit = require('../model/ANCVisit');
const Delivery = require('../model/Delivery');
const PNC = require('../model/PNC');
const { Op } = require('sequelize');
const NewBorn = require('../model/NewBorn');

exports.analyzeResult = async (req, res) => {
  const token = await req.cookies["access-token"];
    const from = req.body.from;
    const to = req.body.to;
    const ward = req.body.ward;
  try {
        if (ward === "delivery") {
          const { count, rows } = await Delivery.findAndCountAll({
            include: [
              {
                model: User,
              },
              {
                model: Client,
              },
            ],
            where: {
              Date: {
                [Op.between]: [from, to],
              },
            },
            raw: true,
          });

           console.log(rows);
           console.log(count);
           res.render("hmis", {
             user: rows,
             style: "style.css",
             count: count,
             token: token,
             ward: "Clients at Delivery Clinic",
           });
          
        } else if (ward === 'anc') {
          const { count, rows } = await ANCVisit.findAndCountAll({
            include: [
              {
                model: User,
              },
              {
                model: Client,
              },
            ],
            where: {
              date_of_visit: {
                [Op.between]: [from, to],
              },
            },
            raw: true,
          });
           console.log(rows);
           console.log(count);
           res.render("hmis", {
             user: rows,
             style: "style.css",
             count: count,
             token: token,
             ward: "Clients at ANC Clinic",
           });
        } else {
           const { count, rows } = await PNC.findAndCountAll({
             include: [
               {
                 model: User,
               },
               {
                 model: Client,
               },
             ],
             where: {
               date: {
                 [Op.between]: [from, to],
               },
             },
             raw: true
           });
           console.log(rows);
           console.log(count);
           res.render("hmis", {
             user: rows,
             style: "style.css",
             count: count,
             token: token,
             ward: 'Clients at PNC Clinic'
           });
        }
       
      } catch (error) {
        console.log(error);
      }
    
}

exports.users = async (req, res) => {
  const token = await req.cookies["access-token"];
  try {
    const { count, rows } = await User.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    // .then((user) => {
    console.log("count", count);
    // console.log(rows);
    // console.log(rows.Sex);
    res.render("hmis-user", {
      user: rows,
      style: "style.css",
      count: count,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.searchUser = async (req, res) => {
  const token = await req.cookies["access-token"];
  try {
    let query = req.body.users;
    let workers = req.body.userSearch;
    // console.log(query);
    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { user_id: query },
          { user_id: workers },
          { first_name: query },
          { role: query },
          { role: workers },
          { user_name: query },
          { Sex: query },
          { Sex: workers },
          
        ],
      },
      raw: true,
    });
    // .then((result) => {
    res.render("hmis-user", {
      user: rows,
      style: "style.css",
      count: count,
      token: token,
    });
    // })
  } catch (err) {
    
     res.render("hmis-user", {
       style: "style.css",
       count: 0,
       token: token,
       
     });
     console.log(err);
  }
};

exports.hmisDelivery = async (req, res) => {
  const token = await req.cookies["access-token"];
  const motherStatus = req.body.userSearch;
  const motherOrNewBorn = req.body.issueDelivery;
  try {
    if( motherOrNewBorn === 'Mother'){
      const { count, rows } = await Delivery.findAndCountAll({
        include: [
          {
            model: User,
          },
          {
            model: Client,
          },
        ],
        where: {
          MaternalStatus: motherStatus,
        },
        raw: true,
      });
      console.log(rows);
      res.render("hmis-delivery", {
        style: "style.css",
        token: token,
        count: count,
        user: rows,
        mother: motherOrNewBorn,
      });
    } else {
        const { count, rows } = await NewBorn.findAndCountAll({
          include: [
            {
              model: User,
            },
            {
              model: Client,
            },
          ],
          where: {
            Status: motherStatus,
          },
          raw: true,
        });
        console.log(rows);
        res.render("hmis-delivery", {
          style: "style.css",
          token: token,
          count: count,
          user: rows,
          newBorn: motherOrNewBorn,
        });
    }
  } catch (err) {
    console.log(err);
  }
  
}

exports.atDelivery = async (req, res) => {
  const token = await req.cookies["access-token"];
 try {
    const { count, rows } = await Delivery.findAndCountAll({
      include: [
        {
          model: User,
        },
        {
          model: Client,
        },
      ],
     
      raw: true,
    });
    
    console.log(rows);

    res.render("hmis-delivery", {
      style: "style.css",
      token: token,
      count: 0,
    });
  } catch (err) {
    console.log(err);
  }
}