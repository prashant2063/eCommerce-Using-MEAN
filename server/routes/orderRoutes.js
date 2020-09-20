var express=require("express");
const orderControllers = require("../controllers/orderControllers");

var router=express.Router();

router.post("/placeOrder",orderControllers.placeOrder);

module.exports=router;