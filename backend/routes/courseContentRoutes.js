const { Router } = require("express");
const contentRouter = Router();
const { addSection, addLecture, getCourseCurriculum, getProtectedCourseContent } = require("../controllers/courseContentController");

const { adminMiddleware } = require("../middleware/admin");
const { userMiddleware } = require("../middleware/user");  

contentRouter.post("/section", adminMiddleware, addSection);

contentRouter.post("/lecture", adminMiddleware, addLecture);

contentRouter.get("/curriculum/:courseId", getCourseCurriculum);

contentRouter.get("/course/:courseId", userMiddleware, getProtectedCourseContent);

module.exports = contentRouter;