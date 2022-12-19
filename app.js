const express = require("express");
const app = express();
const {notFound} = require("./middleware/not-found");
const {errorHandlerMiddleware} = require("./middleware/error-handler");
const {connectDB} = require("./db/connect")
const route = require("./routes/products");
require("dotenv").config();
require("express-async-errors");

app.use(connectDB);

app.use(express.json());

app.get("/api/v1/store", (req, res, next)=>{
    res.status(200).send('<h1> Store API<h1><a href = "/api/v1/products">Products</a>')
})

app.use('/api/v1/products', route)

app.use(notFound);

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, console.log("Connected"));



