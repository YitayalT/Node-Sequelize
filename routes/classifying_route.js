const express = require('express');
const router = express.Router();
const classifyingRouter = require('../controller/classifingController');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/classifying', checkAuthMiddleware.checkAuth, classifyingRouter.classifying);
router.post('/fillClassifying',  checkAuthMiddleware.checkAuth, classifyingRouter.fillForm);

module.exports = router;