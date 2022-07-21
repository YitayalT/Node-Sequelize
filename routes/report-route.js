const express = require("express");
const router = express.Router();
const reportController = require('../controller/report-controller');
router.post('/prescriptionReport', reportController.prescriptionReport);

module.exports = router;