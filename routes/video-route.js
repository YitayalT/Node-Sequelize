const express = require("express");
const router = express.Router();
const videoController = require('../controller/video-controller');

router.get('/videoCall', videoController.videoConference);
router.get('/report', videoController.report);
module.exports = router;