const express = require("express");
const router = express.Router();
const pncController = require('../controller/pnc-controller');

router.get('/getPnc', pncController.getPnc);
router.post("/addPnc", pncController.addPnc);
router.get("/ancPnc", pncController.ancHistory);
router.post('/ancHistoryPnc', pncController.ancSearch);
router.get("/deliveryPnc", pncController.deliveryHistory);
router.post("/deliveryHistoryPnc", pncController.deliverySearch);


module.exports = router;