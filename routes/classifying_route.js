const express = require('express');
const router = express.Router();
const classifyingRouter = require('../controller/classifingController');

router.get('/classifying', classifyingRouter.classifying);
router.post('/fillClassifying', classifyingRouter.fillForm);

module.exports = router;