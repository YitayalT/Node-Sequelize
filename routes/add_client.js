const express = require('express');
const router = express.Router();
const client_router = require('../controller/client_controller');
const checkAuthMiddleware = require("../midleware/check-auth");
router.get('/addClient', client_router.getClient );
router.post('/add', checkAuthMiddleware.checkAuth,client_router.addClient );
router.get('/clients', client_router.clients );
router.get('/search', client_router.search);
router.get('/edit/:id', client_router.edit);
router.post('/update/:id', client_router.updateClient);


module.exports = router;