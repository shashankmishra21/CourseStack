const { Router } = require("express");
const courseRouter = Router();

const { userMiddleware } = require("../middleware/user");
const { courseModel, purchaseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: "courseId is required"
      });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const existingPurchase = await purchaseModel.findOne({
      userId,
      courseId
    });

    if (existingPurchase) {
      return res.status(400).json({
        message: "Course already purchased"
      });
    }

    const purchase = await purchaseModel.create({
      userId,
      courseId,
      paymentStatus: "paid",
      amount: course.price,
      purchasedAt: new Date()
    });

    return res.status(201).json({
      message: "You have successfully purchased the course",
      purchase
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error purchasing course",
      error: error.message
    });
  }
});

courseRouter.get("/preview", async function (req, res) {
  try {
    const courses = await courseModel.find({ isPublished: true });

    return res.json({
      courses
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching courses",
      error: error.message
    });
  }
});

courseRouter.get("/purchased", userMiddleware, async function (req, res) {
  try {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
      userId,
      paymentStatus: "paid"
    });

    const purchasedCourseIds = purchases.map((purchase) => purchase.courseId);

    const courses = await courseModel.find({
      _id: { $in: purchasedCourseIds }
    });

    return res.json({
      courses
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchased courses",
      error: error.message
    });
  }
});

module.exports = courseRouter;