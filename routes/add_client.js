const express = require('express');
const router = express.Router();
const client_router = require('../controller/client_controller');
const checkAuthMiddleware = require("../midleware/check-auth");

router.get('/addClient',checkAuthMiddleware.checkAuth, client_router.getClient );
router.post('/add', checkAuthMiddleware.checkAuth,client_router.addClient );
router.get("/clients", checkAuthMiddleware.checkAuth, client_router.clients);
router.post('/search', client_router.search);
router.get('/edit/:id', client_router.edit);
router.post('/update/:id', client_router.updateClient);
router.get("/deleteClient/:id", client_router.deleteClient);
router.get('/clientList', client_router.clientList);
router.post('/mobileRegister', client_router.mobileRegister);

module.exports = router;