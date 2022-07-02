const express = require('express');
const router = express.Router();
const prescription_controller = require('../controller/prescription-controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/getPrescription', prescription_controller.getPrescription);
router.post('/addPrescription',checkAuthMiddleware.checkAuth ,prescription_controller.addPrescription);
router.post('/Prescription', prescription_controller.prescription);

module.exports = router;