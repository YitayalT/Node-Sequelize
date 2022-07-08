const express = require('express');
const router = express.Router();
const newBorn = require('../controller/newBorn-controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get("/newBorn", checkAuthMiddleware.checkAuth, newBorn.getNewBorn);
router.post("/addNewBorn", checkAuthMiddleware.checkAuth, newBorn.addNewborn);

module.exports = router;