const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require('../db');
const { courseModel } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require('../config');
const adminMiddleware = require("../middleware/admin");
const cloudinary = require('cloudinary').v2;



adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    // todo zod vlidation
    // hash the password so that plain text is not stored in db

    try {
        await adminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Signup failed:", error);
        res.status(500).json({ error: "Signup failed. Please try again later." });
    }

});


adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });
    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({ message: "Invalid email or password" });
    }
})

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, price } = req.body;

    const { image } = req.files;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
    }

    const allowedImageTypes = ['image/jpeg', 'image/png'];
    // Check if the uploaded file is an image
    if (!allowedImageTypes.includes(image.mimetype)) {
        return res.status(400).json({ message: "Invalid image type. Only JPEG and PNG are allowed." });
    }

    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
        return res
            .status(400)
            .json({ errors: "Error uploading file to cloudinary" });
    }


    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        image: {
            public_id: cloud_response.public_id,
            url: cloud_response.url,
        },
        creatorId: adminId
    })


    res.json({
        message: "Course created",
        courseId: course._id,
        course
    })
})

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, image, price, courseId } = req.body;

    //  image option have to be inserted.
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
        price: price,
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    });
    res.json({
        message: "Here's is all courses",
        courses
    })
})

module.exports = adminRouter;
