const express = require("express");
const router = express.Router();
const anc_controller = require('../controller/Anc_controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/ancVisit',checkAuthMiddleware.checkAuth, anc_controller.getAncVisit);
router.get("/ancHistory",checkAuthMiddleware.checkAuth, anc_controller.getAncHistory);
router.get("/PreventiveHistory",checkAuthMiddleware.checkAuth, anc_controller.preventiveCareHistory);
router.post("/ancVisit",checkAuthMiddleware.checkAuth, anc_controller.addAncData);
router.get('/labHistory',checkAuthMiddleware.checkAuth, anc_controller.labHistory);

module.exports = router;
