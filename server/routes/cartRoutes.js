var express=require("express");
const cartControllers = require("../controllers/cartControllers");

var router=express.Router();

router.post("/add",cartControllers.addToCart);
router.post("/getItemsCount",cartControllers.getItemsCount)
router.post("/getItems",cartControllers.getItems)
router.post("/removeItem",cartControllers.removeItem)
router.post("/updateItem",cartControllers.updateItem)

module.exports=router;