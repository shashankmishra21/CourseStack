const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema(
    {
        title: { type: String, required: true },
        description: String,
        price: { type: Number, default: 0 },
        image: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        creatorId: {
            type: ObjectId,
            ref: "admin",
            required: true,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const sectionSchema = new Schema(
    {
        courseId: {
            type: ObjectId,
            ref: "course",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const lectureSchema = new Schema(
    {
        courseId: {
            type: ObjectId,
            ref: "course",
            required: true,
        },
        sectionId: {
            type: ObjectId,
            ref: "section",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: String,
        videoType: {
            type: String,
            enum: ["upload", "youtube"],
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            default: 0,
        },
        isPreview: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const purchaseSchema = new Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        courseId: {
            type: ObjectId,
            ref: "course",
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        amount: {
            type: Number,
            default: 0,
        },
        stripeSessionId: {
            type: String,
            default: "",
        },
        purchasedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const sectionModel = mongoose.model("section", sectionSchema);
const lectureModel = mongoose.model("lecture", lectureSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    sectionModel,
    lectureModel,
    purchaseModel,
};