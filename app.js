require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let server = require("http").Server(app);
let io = require("socket.io")(server);
let stream = require("./streamHelper/stream");

const db = require('./config/database');
const dotenv = require('dotenv');
const classifyingRoute = require('./routes/classifying_route');
const cookieParser = require("cookie-parser");
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");


// import models
const ClassifyingForm = require("./model/ClasifyingForm");
const NewBorn = require('./model/NewBorn');
const ancVisit = require('./model/ANCVisit');
const Delivery = require('./model/Delivery');
const Message = require('./model/Message');
const Feedback = require('./model/Feedback');
const Prescription = require('./model/Prescription');
const Radiology = require('./model/Radiology');
const Bed = require('./model/Bed');
const Pnc = require('./model/PNC');
const Client = require('./model/Client');
const User = require('./model/User');
const LabResult = require('./model/LabResult');
const PreventiveCare = require("./model/PreventiveCare");
const AncVisit = require("./model/ANCVisit");

// import routes
const care = require('./routes/preventive-care-route');
const router = require('./routes/add_client');
const user_route = require('./routes/user_route');
const newBornRoute = require('./routes/newBorn-route');
const radiologyRoute = require('./routes/radiology-route');
const ancRoute = require('./routes/anc_route');
const pncRoute = require('./routes/pnc-route');
const prescriptionRoute = require('./routes/prescription-route');
const delivery_route = require('./routes/delivery-route');
const labExamRoute = require('./routes/labExam-route');
const message = require('./routes/message-route');
const bedRoute = require('./routes/bed-route');
const videoRoute = require('./routes/video-route');
const reportRoute = require('./routes/report-route');


dotenv.config({ path: './.env' });
//Handlebars
app.engine("hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine' , 'hbs');

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

 app.use(function (req, res, next) {
   res.header(
     "Access-Control-Allow-Headers",
     "x-access-token, Origin, Content-Type, Accept"
   );
   next();
 });

//test database connection
// db.authenticate().then( () =>{
//     console.log('connected!');
// })
// .catch( (err) =>{
//      console.log(err)
//     });

// Anc relationship
Client.hasMany(AncVisit, {
  foreignKey: "MRN",
});

AncVisit.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(AncVisit, {
  foreignKey: "UserId",
});

AncVisit.belongsTo(User, {
  foreignKey: "UserId",
});

// prescription relationship

Client.hasMany(Prescription, {
  foreignKey: 'MRN'
});

Prescription.belongsTo(Client, {
  foreignKey: "MRN",
});
User.hasMany(Prescription, {
  foreignKey: 'UserId'
})
Prescription.belongsTo(User, {
  foreignKey: "UserId",
});

// preventive care relationship

Client.hasMany(PreventiveCare, {
  foreignKey: 'MRN'
});
PreventiveCare.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(PreventiveCare, {
  foreignKey: 'UserId'
});
PreventiveCare.belongsTo(User, {
  foreignKey: "UserId",
});

// classifying form model

Client.hasMany(ClassifyingForm, {
  foreignKey: 'MRN'
});
ClassifyingForm.belongsTo(Client, {
  foreignKey: 'MRN'
});

User.hasMany(ClassifyingForm, {
  foreignKey: 'UserId'
});

ClassifyingForm.belongsTo(User, {
  foreignKey: "UserId",
});

// LabResult result relationship
Client.hasMany(LabResult, {
  foreignKey: "MRN",
});
LabResult.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(LabResult, {
  foreignKey: "UserId",
});

LabResult.belongsTo(User, {
  foreignKey: "UserId",
});
// Delivery relationship
Client.hasMany(Delivery, {
  foreignKey: "MRN",
});
Delivery.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(Delivery, {
  foreignKey: "UID",
});

Delivery.belongsTo(User, {
  foreignKey: "UID",
});

// new born relationship
Client.hasMany(NewBorn, {
  foreignKey: "MRN",
});
NewBorn.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(NewBorn, {
  foreignKey: "UID",
});

NewBorn.belongsTo(User, {
  foreignKey: "UID",
});

// Radiology Relationship
Client.hasMany(Radiology, {
  foreignKey: "MRN",
});
Radiology.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(Radiology, {
  foreignKey: "UserId",
});

Radiology.belongsTo(User, {
  foreignKey: "UserId",
});

// pnc relationship
Client.hasMany(Pnc, {
  foreignKey: "MRN",
});
Pnc.belongsTo(Client, {
  foreignKey: "MRN",
});

User.hasMany(Pnc, {
  foreignKey: "UserId",
});

Pnc.belongsTo(User, {
  foreignKey: "UserId",
});

//  User.sync({alter: true}).then( () =>{
//     console.log('synced!');
// }).catch( (err) =>{
//     console.log(err);
// });

// home page route
app.get('/', (req, res) => {
  res.render('home', {
    style: 'style.css'
  });
});

app.get('/aboutUs', (req, res) => {
  res.render('about-us', {
    style: 'style.css'
  });
});

// service route
app.get("/service", (req, res) => {
  res.render("services", {
    style: "style.css",
  });
});


// router middle wares
app.use("", router);
app.use("", user_route);
app.use("", classifyingRoute);
app.use("", care);
app.use("", ancRoute);
app.use("", delivery_route);
app.use("", message);
app.use("", newBornRoute);
app.use("", pncRoute);
app.use("", prescriptionRoute);
app.use("", labExamRoute);
app.use("", radiologyRoute);
app.use("", bedRoute);
app.use("", videoRoute);
app.use("", reportRoute);
// socket
io.of("/stream").on("connection", stream);
// listening the server
app.listen(3000, () =>{
    console.log('server is started at port 3000');
});
