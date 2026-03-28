import axios from "axios";
import { BACKEND_URL } from "../utils/util";

export const PurchaseCourse = async (courseId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Please log in to enroll.");
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}/course/purchase`,
      { courseId },
      {
        headers: {
          token: token
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to enroll.");
  }
};

export default PurchaseCourse;