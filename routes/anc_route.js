const express = require("express");
const router = express.Router();
const anc_controller = require('../controller/Anc_controller');

router.get('/ancVisit', anc_controller.getAncVisit);
router.get("/ancHistory", anc_controller.getAncHistory);
router.post("/ancVisit", anc_controller.addAncData);
router.get('/labHistory', anc_controller.labHistory);

module.exports = router;
