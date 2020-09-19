var express=require("express");
const productControllers = require("../controllers/productControllers");

var router=express.Router();

router.post("/",productControllers.fetchProducts);

module.exports=router;