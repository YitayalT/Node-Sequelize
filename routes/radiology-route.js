const express = require('express');
const router = express.Router();
const radiologyController = require('../controller/radiology-controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/Radiology' ,checkAuthMiddleware.checkAuth, radiologyController.getRadiology);
router.post('/Radiology' ,checkAuthMiddleware.checkAuth, radiologyController.addRadiology);
module.exports = router;