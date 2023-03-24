const express = require("express");
const app = express();
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose")
const PORT = 5000;
const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")

app.use(express.json())
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(console.log("Connect to MongoDb"))
.catch(err=>console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)

app.listen(PORT, ()=>{
	console.log(`Server Running On Port ${PORT}`);
})