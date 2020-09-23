const express= require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");


const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");

const PORT = 3000;


const app = express();

app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "ShopSpot","index.html"));
})
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "ShopSpot","index.html"));
})
app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "ShopSpot","index.html"));
})
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "ShopSpot","index.html"));
})
app.get("/cart",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "ShopSpot","index.html"));
})
app.get("/order",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "dist", "ShopSpot","index.html"));
})
app.use(express.static(path.join(__dirname, "public", "dist", "ShopSpot")));
app.use("/products",express.static(path.join(__dirname,"public","products")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/user",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/address",addressRoutes);
app.use("/api/order",orderRoutes);

app.listen(PORT,(err)=>{
    if (!err)
        console.log(`Running on http://localhost:${PORT}/`);
})