const express = require('express');
const router = express.Router();
const bedController = require('../controller/bed-controller');

router.get('/bed', bedController.getBed);

module.exports = router;