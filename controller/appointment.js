
require("dotenv").config();
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
     res.render("notification", {
       style: "style.css",
       script: "index.js",
       token: token
       
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