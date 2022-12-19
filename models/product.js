const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is mandatory"]
    },
    price : {
        type : Number,
        required : [ true, "Price is mandatory"]
    },
    featured : {
        type: Boolean,
        default : false
    },
    rating : {
        type: Number,
        default: 4.5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    company : {
        type : String,
        enum : {
            values : ['ikea', 'liddy', 'caressa', 'marcos'],
            message : '{VALUE} is not supported'
        }
    }
})

let Product  = mongoose.model("products", productSchema)

module.exports = {
    Product
}