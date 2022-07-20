

const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: "57c0aa17",
  apiSecret: "krOSrHSaF2t9K2ek",
});
exports.setAppointment = (req, res) => {
     res.render("notification", {
       style: "style.css",
       script: "index.js",
       
     });
}

exports.appointmentDate = (req, res) => {
    const fName = req.body.fname;
    const message = req.body.message;
    const tel = req.body.phone;

     const from = "Vonage APIs";
     const to = "+251928577562";
     const text =`Hello, ${fName}. ${message}`;

     vonage.message.sendSms(from, to, text, (err, responseData) => {
       if (err) {
         console.log(err);
       } else {
         if (responseData.messages[0]["status"] === "0") {
             console.log("Message sent successfully.");
             res.render('notification', {
                 style: 'style.css',
                 script: 'index.js',
                 message: 'notification send successfully'
             });
         } else {
           console.log(
             `Message failed with error: ${responseData.messages[0]["error-text"]}`
             );
              res.render("notification", {
                style: "style.css",
                script: "index.js",
                wrong: "something goes wrong. please, try again",
              });
         }
       }
     });
 } 