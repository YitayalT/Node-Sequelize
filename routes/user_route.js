const express = require("express");
const router = express.Router();
const user_controller = require("../controller/user_controller");
const checkAuthMiddleware = require('../midleware/check-auth');
router.get('/addUser',checkAuthMiddleware.checkAuth, user_controller.usersAdd);
router.post("/addUser",checkAuthMiddleware.checkAuth,user_controller.addUser);
router.get("/login", user_controller.getLoggedIn);
router.post("/userSearch", user_controller.search);
router.post("/login", user_controller.login);
router.get("/users",checkAuthMiddleware.checkAuth, user_controller.getUser);
router.get('/logout', user_controller.logout);
// router.delete('delete/: mrn', user_controller.deleteUser);
// router.get("/edit/:id", user_controller.edit);
// router.post("/update/:id", user_controller.updateUser);

module.exports = router;
