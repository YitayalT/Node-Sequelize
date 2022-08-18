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
router.get("/LabPnc", pncController.labHistory);
router.get("/RadPnc", pncController.radiologyResult);
router.post("/RadPnc", pncController.radiologySearch);
router.post("/deliveryHistoryPnc", pncController.deliverySearch);
router.post("/LabPnc", pncController.labHistorySearch);
router.get("/newBornPnc", pncController.newBornHistory);
router.post("/newBornHistoryPnc", pncController.newBornSearch);
router.get('/pncToLab', pncController.pncToLab);
router.post("/pncToLab", pncController.requestToLab);


module.exports = router;