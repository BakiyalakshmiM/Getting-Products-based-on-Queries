const mongoose = require("mongoose");
require("dotenv").config();

let connectDB = async (req, res, next) => {
    try{
      await mongoose.connect( process.env.MONGO_URI, {
        "useCreateIndex": true,
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
      })
        console.log("Connected To DB");
        next();
    }
    catch(err){
      res.send(err);
    }
  }

module.exports = {
  connectDB
}