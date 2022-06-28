const express = require("express");
const router = express.Router();
const labExam = require("../controller/labRequest-controller");

router.get('/labExam', labExam.getLabRequest);

module.exports = router;
