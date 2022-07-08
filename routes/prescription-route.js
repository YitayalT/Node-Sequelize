const express = require('express');
const router = express.Router();
const prescription_controller = require('../controller/prescription-controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/getPrescription' ,checkAuthMiddleware.checkAuth, prescription_controller.getPrescription);
router.post('/addPrescription' ,checkAuthMiddleware.checkAuth,checkAuthMiddleware.checkAuth ,prescription_controller.addPrescription);
router.get('/Prescription', prescription_controller.prescription);

module.exports = router;