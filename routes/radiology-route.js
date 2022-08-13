const express = require('express');
const router = express.Router();
const radiologyController = require('../controller/radiology-controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/Radiology', checkAuthMiddleware.checkAuth, radiologyController.getRadiology);
router.get('/radiologyHistory' ,checkAuthMiddleware.checkAuth, radiologyController.radiologyResult);
router.post('/Radiology', checkAuthMiddleware.checkAuth, radiologyController.addRadiology);
router.post('/searchRadiology', checkAuthMiddleware.checkAuth, radiologyController.radiologySearch);
router.get('/radiologyRequest', radiologyController.getLabRequest);
router.post('/radiologyRequest', radiologyController.labRequestSearch);

module.exports = router;