const express = require('express');
const router = express.Router();
const classifyingRouter = require('../controller/classifingController');

router.get('/classifying', classifyingRouter.classifying);

module.exports = router;