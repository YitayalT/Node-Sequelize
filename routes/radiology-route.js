const express = require('express');
const router = express.Router();
const radiologyController = require('../controller/radiology-controller');
router.get('/Radiology', radiologyController.getRadiology);
module.exports = router;