const Sequelize = require("sequelize");
const ANCVisit = require("../model/ANCVisit");

exports.getAncVisit = (req, res) => {
    res.send('Hello,Anc visitors');
}