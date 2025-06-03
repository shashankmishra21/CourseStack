const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");
const { courseModel } = require("../db");
const { purchaseModel } = require("../db");


courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    // you may expect a user to pay here
    const userId = req.userId;
    const courseId = req.body.courseId;

    // here we should check if the user is paid the price or not.
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    });

    res.json({
        message: "you have successfully purchased the course",
        courseId: courseId
    });
})

courseRouter.get("/preview", async function (req, res) {

    const courses = await courseModel.find({})

    res.json({
        courses
    })
})

module.exports = courseRouter;