const { Router } = require("express");
const userRouter = Router();
const { userModel } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require("../middleware/user");
const { purchaseModel } = require("../db");
const { courseModel } = require("../db");


userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  // todo zod vlidation
  // hash the password so that plain text is not stored in db

  try {
    await userModel.create({
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

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });

    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);


    
      res.status(200).json({
        message: "Signin successful",

        token: token,
        // Will be shown only in console on frontend
      });
    } else {
      res.status(403).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Signin failed:", error);
    res.status(500).json({ message: "Signin failed. Please try again later." });
  }
});



userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  })
  const courseData = await courseModel.find({
    _id: { $in: purchases.map(x => x.courseId) }
  })

  res.json({
    purchases,
    courseData
  })
})


module.exports = userRouter
