const express = require("express");
const router = express.Router();
const user_controller = require("../controller/user_controller");
const checkAuthMiddleware = require('../midleware/check-auth');
router.get('/addUser', user_controller.usersAdd);
router.post("/addUser",checkAuthMiddleware.checkAuth,user_controller.addUser);
router.get("/login", user_controller.getLoggedIn);
router.post("/login", user_controller.login);
router.get("/users", user_controller.getUser);
router.get('/logout', user_controller.logout);
// router.get("/search", user_controller.search);
// router.get("/edit/:id", user_controller.edit);
// router.post("/update/:id", user_controller.updateUser);

module.exports = router;
