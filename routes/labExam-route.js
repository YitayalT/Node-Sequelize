const express = require("express");
const router = express.Router();
const labExam = require("../controller/labRequest-controller");
const checkAuthMiddleware = require('../midleware/check-auth');

router.get("/labExam", checkAuthMiddleware.checkAuth, labExam.getLabRequest);
router.post("/labExam", checkAuthMiddleware.checkAuth, labExam.addLabResult);

module.exports = router;
