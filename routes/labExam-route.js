const express = require("express");
const router = express.Router();
const labExam = require("../controller/labRequest-controller");
const checkAuthMiddleware = require('../midleware/check-auth');

router.get("/labExam", checkAuthMiddleware.checkAuth, labExam.getLabRequest);
router.get("/labHistory", checkAuthMiddleware.checkAuth, labExam.labHistory);
router.post("/labExam", checkAuthMiddleware.checkAuth, labExam.addLabResult);
router.post("/labHistorySearch", checkAuthMiddleware.checkAuth, labExam.labHistorySearch);
module.exports = router;
