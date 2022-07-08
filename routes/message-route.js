const express = require("express");
const router = express.Router();
const messageController = require('../controller/message-controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/getMessage', checkAuthMiddleware.checkAuth,messageController.getMessages);
router.post("/addMessage",  checkAuthMiddleware.checkAuth, messageController.sendMessage);
router.get("/message",  checkAuthMiddleware.checkAuth, messageController.message);

module.exports = router;