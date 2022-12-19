const mongoose = require("mongoose");
const products = require("./products.json")
const { Product} = require("./models/product")
require("dotenv").config();

let uploadData = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected");
        await Product.deleteMany({})
        await Product.insertMany(products)
        console.log("Updated To DB")
        process.exit(0);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

uploadData()
