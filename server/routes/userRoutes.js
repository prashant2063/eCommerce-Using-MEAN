var express=require("express");
const userControllers = require("../controllers/userControllers");

var router=express.Router();

router.post("/login",userControllers.checkUser);
router.post("/register",userControllers.registerUser)

module.exports=router;