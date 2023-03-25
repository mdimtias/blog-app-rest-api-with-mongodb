const express = require("express");
const app = express();
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose")
const PORT = 5000;
const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")
const postsRoute = require("./routes/posts.js")
const categoryRoute = require("./routes/categories.js")

// Image Upload
const storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, "images");
	},
	filename: (req, file, cb)=>{
		// cb(null, req.body.name);
		cb(null, "hello.jpg");
	},
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
	res.status(200).json("File has been uploaded");
})

app.use(express.json())
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(console.log("Connect to MongoDb"))
.catch(err=>console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)
app.use("/api/categories", categoryRoute)

app.listen(PORT, ()=>{
	console.log(`Server Running On Port ${PORT}`);
})