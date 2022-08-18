
require("dotenv").config();
const ANCVisit = require('../model/ANCVisit');
const Client = require('../model/Client');
const User = require('../model/User');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log('token', authToken);
const client = require("twilio")(accountSid, authToken);


// const Vonage = require("@vonage/server-sdk");
// const vonage = new Vonage({
//   apiKey: "57c0aa17",
//   apiSecret: "krOSrHSaF2t9K2ek",
// });
exports.setAppointment = async (req, res) => {
  const token = await req.cookies["access-token"];
   const appointment = new Date();
     res.render("notification", {
       style: "style.css",
       script: "index.js",
       token: token,
       count: 0,
       today: appointment
       
     });
}

exports.appointmentDate = async (req, res) => {
  const token = await req.cookies["access-token"];
    const fName = req.body.fname;
    const message = req.body.message;
    const tel = req.body.phone;
  client.messages.create({
      body: "Hello, Gelila. Your appointment date is tomorrow at 4:00. FHCSH.",
      from: "+12569801297",
      to: "+251928577562",  
    })
    .then((message) => {
      console.log(message);
      res.render("notification", {
        style: "style.css",
        script: "index.js",
        message: "notification sent successfully",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
    //  const from = "Vonage APIs";
    //  const to = "+251928577562";
    //  const text =`Hello, Gelila`;

    //  vonage.message.sendSms(from, to, text, (err, responseData) => {
    //    if (err) {
    //      console.log(err);
    //    } else {
    //      if (responseData.messages[0]["status"] === "0") {
    //          console.log("Message sent successfully.");
    //          res.render('notification', {
    //              style: 'style.css',
    //              script: 'index.js',
    //              message: 'notification sent successfully'
    //          });
    //      } else {
    //        console.log(
    //          `Message failed with error: ${responseData.messages[0]["error-text"]}`
    //          );
    //           res.render("notification", {
    //             style: "style.css",
    //             script: "index.js",
    //             wrong: "something goes wrong. please, try again",
    //           });
    //      }
    //    }
    //  });

  
} 
 
exports.tomorrowAppointment = async (req, res) => {
  const token = await req.cookies["access-token"];
  // const appointment = req.body.date;
  const today = new Date();
  const appointment = new Date(req.body.date);
  console.log('Today is: ', appointment);
  var date = appointment.getDate();
  var month = appointment.getMonth();
  var year = appointment.getFullYear();
  appointment.setDate(date+1)
  console.log("Tomorrow is: ", appointment);
  console.log(`date is: ${date}, month is: ${month} and year is: ${year}`);
  try {
    const { count, rows } = await ANCVisit.findAndCountAll({
      include: [
        {
          model: Client
        },
        {
          model: User
        }
      ],
      where: {
        Next_Appointment: appointment
      },
      raw: true
    });

    console.log(rows);
    res.render("notification", {
      style: "style.css",
      user: rows,
      token: token,
      count: count,
      today: today
    });
    
   } catch (error) {
    console.log(err);
   }
}