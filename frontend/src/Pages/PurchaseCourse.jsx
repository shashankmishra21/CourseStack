import axios from "axios";
import { BACKEND_URL } from "../utils/util";

export const PurchaseCourse = async (courseId) => {
  const token = localStorage.getItem("token")?.trim();

  if (!token) {
    throw new Error("Please log in to enroll.");
  }

  if (!courseId) {
    throw new Error("Course ID is required.");
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}/course/purchase`,
      { courseId },
      {
        headers: {
          token,
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to enroll.";

    throw new Error(message);
  }
};

export default PurchaseCourse;