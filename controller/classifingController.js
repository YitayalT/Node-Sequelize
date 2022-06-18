const db = require('../config/database');
const ClassifyingForm = require('../model/ClasifyingForm');

exports.classifying = (req, res) => {
    res.render('classifying_form', {
        style: 'user.css'
    });
}