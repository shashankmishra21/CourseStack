const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const courseRouter = require("./routes/course");
const cloudinary = require('cloudinary').v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");


app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// app.use(cors({
//   origin: 'http://localhost:5173', // your frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization' , 'token'],  // allow Authorization header here
//   credentials: true,
// }));


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Manually set CORS headers for preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//defining routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloud_name,
        api_key:  process.env.api_key,
        api_secret:  process.env.api_secret
    });


async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(" Error connecting to MongoDB:", err.message);
    }
}
main();