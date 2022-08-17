const express = require("express");
const router = express.Router();
const anc_controller = require('../controller/Anc_controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/ancVisit',checkAuthMiddleware.checkAuth, anc_controller.getAncVisit);
router.get("/ancHistory",checkAuthMiddleware.checkAuth, anc_controller.getAncHistory);
router.get("/PreventiveHistory",checkAuthMiddleware.checkAuth, anc_controller.preventiveCareHistory);
router.post("/ancVisit",checkAuthMiddleware.checkAuth, anc_controller.addAncData);
router.get('/ancLab', checkAuthMiddleware.checkAuth, anc_controller.labHistory);

router.get('/ancToLab', anc_controller.ancToLab);
router.post("/ancToLab", anc_controller.requestToLab);
router.post("/ancLabSearch", checkAuthMiddleware.checkAuth, anc_controller.labHistorySearch);
router.post("/ancSearch", checkAuthMiddleware.checkAuth, anc_controller.ancSearch);
router.post("/preventiveCareSearch", checkAuthMiddleware.checkAuth, anc_controller.PreventiveCareSearch);
router.get('/radAtAnc', anc_controller.radiologyResult);
router.post("/radAtAnc", anc_controller.radiologySearch);
module.exports = router;
