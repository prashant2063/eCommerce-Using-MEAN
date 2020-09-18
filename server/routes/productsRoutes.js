var express=require("express");
const productsControllers = require("../controllers/productsControllers");

var router=express.Router();

router.post("/",productsControllers.fetchProducts);

module.exports=router;