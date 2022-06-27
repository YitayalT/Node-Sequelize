const express = require('express');
const router = express.Router();
const newBorn = require('../controller/newBorn-controller');

router.get('/newBorn', newBorn.getNewBorn);
router.post("/addNewBorn", newBorn.addNewborn);

module.exports = router;