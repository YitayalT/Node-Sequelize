const express = require('express');
const router = express.Router();
const client_router = require('../controller/client_controller');

router.get('/addClient', client_router.getClient );
router.post('/add', client_router.addClient );
router.get('/clients', client_router.clients );
router.get('/search/:id', client_router.search);
router.get('/edit/:id', client_router.edit);
router.post('/update/:id', client_router.updateClient);


module.exports = router;