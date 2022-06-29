const express = require("express");
const router = express.Router();
const labExam = require("../controller/labRequest-controller");

router.get('/labExam', labExam.getLabRequest);
router.post('/labExam', labExam.addLabResult);

module.exports = router;
