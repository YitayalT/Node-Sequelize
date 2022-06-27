const express = require("express");
const router = express.Router();
const messageController = require('../controller/message-controller');

router.get('/getMessage', messageController.getMessages);
router.post("/addMessage", messageController.sendMessage);

module.exports = router;