const { courseModel, sectionModel, lectureModel, purchaseModel } = require("../db");

const addSection = async (req, res) => {
  try {
    const adminId = req.userId;
    const { courseId, title } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({
        message: "courseId and title are required"
      });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    if (course.creatorId.toString() !== adminId) {
      return res.status(403).json({
        message: "You are not allowed to modify this course"
      });
    }

    const sectionCount = await sectionModel.countDocuments({ courseId });

    const section = await sectionModel.create({
      courseId,
      title,
      order: sectionCount + 1
    });

    return res.status(201).json({
      message: "Section added successfully",
      section
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding section",
      error: error.message
    });
  }
};

const addLecture = async (req, res) => {
  try {
    const adminId = req.userId;
    const {
      courseId,
      sectionId,
      title,
      description,
      videoType,
      videoUrl,
      duration,
      isPreview
    } = req.body;

    if (!courseId || !sectionId || !title || !videoType || !videoUrl) {
      return res.status(400).json({
        message: "courseId, sectionId, title, videoType, videoUrl are required"
      });
    }

    if (!["upload", "youtube"].includes(videoType)) {
      return res.status(400).json({
        message: "videoType must be either 'upload' or 'youtube'"
      });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    if (course.creatorId.toString() !== adminId) {
      return res.status(403).json({
        message: "You are not allowed to modify this course"
      });
    }

    const section = await sectionModel.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        message: "Section not found"
      });
    }

    if (section.courseId.toString() !== courseId) {
      return res.status(400).json({
        message: "This section does not belong to the selected course"
      });
    }

    const lectureCount = await lectureModel.countDocuments({ sectionId });

    const lecture = await lectureModel.create({
      courseId,
      sectionId,
      title,
      description: description || "",
      videoType,
      videoUrl,
      duration: duration || 0,
      isPreview: !!isPreview,
      order: lectureCount + 1
    });

    return res.status(201).json({
      message: "Lecture added successfully",
      lecture
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding lecture",
      error: error.message
    });
  }
};

const getCourseCurriculum = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId).lean();

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const sections = await sectionModel
      .find({ courseId })
      .sort({ order: 1 })
      .lean();

    const lectures = await lectureModel
      .find({ courseId })
      .sort({ order: 1 })
      .lean();

    const structuredSections = sections.map((section) => ({
      ...section,
      lectures: lectures.filter(
        (lecture) => lecture.sectionId.toString() === section._id.toString()
      )
    }));

    return res.status(200).json({
      message: "Curriculum fetched successfully",
      course,
      sections: structuredSections
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching curriculum",
      error: error.message
    });
  }
};

const getProtectedCourseContent = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId).lean();

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const sections = await sectionModel
      .find({ courseId })
      .sort({ order: 1 })
      .lean();

    const lectures = await lectureModel
      .find({ courseId })
      .sort({ order: 1 })
      .lean();

    const purchase = await purchaseModel.findOne({
      userId,
      courseId
    }).lean();

    const isPurchased =
      !!purchase &&
      (!purchase.paymentStatus || purchase.paymentStatus === "paid");

    const structuredSections = sections.map((section) => ({
      ...section,
      lectures: lectures
        .filter(
          (lecture) => lecture.sectionId.toString() === section._id.toString()
        )
        .map((lecture) => {
          if (isPurchased || lecture.isPreview) {
            return {
              ...lecture,
              isLocked: false
            };
          }

          return {
            _id: lecture._id,
            courseId: lecture.courseId,
            sectionId: lecture.sectionId,
            title: lecture.title,
            description: lecture.description,
            videoType: lecture.videoType,
            duration: lecture.duration,
            isPreview: lecture.isPreview,
            order: lecture.order,
            isLocked: true
          };
        })
    }));

    return res.status(200).json({
      message: "Course content fetched successfully",
      isPurchased,
      course,
      sections: structuredSections
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching protected course content",
      error: error.message
    });
  }
};

module.exports = { addSection, addLecture, getCourseCurriculum, getProtectedCourseContent };