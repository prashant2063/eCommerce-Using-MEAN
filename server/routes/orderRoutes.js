var express=require("express");
const orderControllers = require("../controllers/orderControllers");

var router=express.Router();

router.post("/placeOrder",orderControllers.placeOrder);
router.post("/getOrders",orderControllers.getOrders);

module.exports=router;