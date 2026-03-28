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
const contentRouter = require("./routes/courseContentRoutes");


app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const allowedOrigins = [
  'http://localhost:5173',
  'https://coursestack-elearning.vercel.app',
  'https://course-stack-seven.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Incoming Origin:", origin); // DEBUG

    if (!origin) return callback(null, true); // Postman / mobile apps

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') // allow all Vercel previews
    ) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/course", courseRouter);
app.use("/api/content", contentRouter)

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
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