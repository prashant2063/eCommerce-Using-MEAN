const express= require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");


const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");


const PORT = 3000;


const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use("/api/user",userRoutes);
app.use("/api/products",productsRoutes);

app.listen(PORT,(err)=>{
    if (!err)
        console.log(`Running on http://localhost:${PORT}/`);
})