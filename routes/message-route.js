const express = require("express");
const router = express.Router();
const messageController = require('../controller/message-controller');

router.get('/getMessage', messageController.getMessages);
router.post("/addMessage", messageController.sendMessage);
router.get("/message", messageController.message);

module.exports = router;