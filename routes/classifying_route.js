const express = require('express');
const router = express.Router();
const classifyingRouter = require('../controller/classifingController');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/classifying', checkAuthMiddleware.checkAuth, classifyingRouter.classifying);
router.get('/classifyingHistory', checkAuthMiddleware.checkAuth, classifyingRouter.getClassifyingHistory);
router.post('/fillClassifying',  checkAuthMiddleware.checkAuth, classifyingRouter.fillForm);
router.post('/searchClassifying',  checkAuthMiddleware.checkAuth, classifyingRouter.classifyingSearch);

module.exports = router;