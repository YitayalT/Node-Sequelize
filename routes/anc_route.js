const express = require("express");
const router = express.Router();
const anc_controller = require('../controller/Anc_controller');

router.get('/ancVisit', anc_controller.getAncVisit);

module.exports = router;
