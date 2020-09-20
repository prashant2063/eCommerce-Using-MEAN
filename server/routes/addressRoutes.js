var express=require("express");
const addressControllers = require("../controllers/addressControllers");

var router=express.Router();

router.post("/addNewAddress",addressControllers.addNewAddress);
router.post("/removeAddress",addressControllers.removeAddress)
router.post("/getAllAddresses",addressControllers.getAllAddresses)

module.exports=router;