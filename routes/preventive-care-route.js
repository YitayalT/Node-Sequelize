const express = require("express");
const router = express.Router();
const preventiveCareController = require('../controller/preventive-care');
router.get('/preventiveCare', preventiveCareController.getPreventiveCare);

module.exports = router;