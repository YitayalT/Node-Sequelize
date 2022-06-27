const express = require("express");
const router = express.Router();
const pncController = require('../controller/pnc-controller');

router.get('/getPnc', pncController.getPnc);
router.post("/addPnc", pncController.addPnc);

module.exports = router;