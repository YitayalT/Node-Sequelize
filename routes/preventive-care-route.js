const express = require("express");
const router = express.Router();
const preventiveCareController = require('../controller/preventive-care');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/preventiveCare',checkAuthMiddleware.checkAuth, preventiveCareController.getPreventiveCare);
router.post('/preventiveCare',checkAuthMiddleware.checkAuth, preventiveCareController.addPreventiveCare);

module.exports = router;