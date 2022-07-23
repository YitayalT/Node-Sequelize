const express = require("express");
const router = express.Router();
const pncController = require('../controller/pnc-controller');

router.get('/getPnc', pncController.getPnc);
router.get("/ancPnc", pncController.ancHistory);
router.post('/ancHistoryPnc', pncController.ancSearch);
router.post("/addPnc", pncController.addPnc);

module.exports = router;