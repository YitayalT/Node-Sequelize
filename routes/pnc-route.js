const express = require("express");
const router = express.Router();
const pncController = require('../controller/pnc-controller');

router.get('/getPnc', pncController.getPnc);
router.post("/addPnc", pncController.addPnc);
router.get("/pncHistory", pncController.pncHistory);
router.post("/pncHistorySearch", pncController.pncSearch);
router.get("/ancPnc", pncController.ancHistory);
router.post('/ancHistoryPnc', pncController.ancSearch);
router.get("/deliveryPnc", pncController.deliveryHistory);
router.post("/deliveryHistoryPnc", pncController.deliverySearch);
router.get("/newBornPnc", pncController.newBornHistory);
router.post("/newBornHistoryPnc", pncController.newBornSearch);


module.exports = router;