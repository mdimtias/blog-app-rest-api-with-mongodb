const express = require("express");
const app = express();
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose")
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(console.log("Connect to MongoDb"))
.catch(err=>console.log(err))


app.listen(PORT, ()=>{
	console.log(`Server Running On Port ${PORT}`);
})