const express = require("express");
const router = express.Router();
const delivery_controller = require('../controller/delivery-controller');

router.get('/getDelivery', delivery_controller.getDelivery);
router.get('/DeliveryHistory', delivery_controller.deliveryHistory);
router.get("/NewBornHistory", delivery_controller.newBornHistory);
router.get("/deliveryAnc", delivery_controller.deliveryAnc);
router.post("/addDelivery", delivery_controller.addDelivery);
router.post("/newBornSearch", delivery_controller.newBornSearch);
router.post("/deliverySearch", delivery_controller.deliverySearch);
router.post("/deliveryAncSearch", delivery_controller.deliveryAncSearch);
module.exports = router;