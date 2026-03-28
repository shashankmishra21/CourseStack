import axios from "axios";
import { BACKEND_URL } from "../utils/util";

export const contentApi = {
  getCurriculum: async (courseId) =>
    axios.get(`${BACKEND_URL}/content/curriculum/${courseId}`),

  getProtectedContent: async (courseId, token) =>
    axios.get(`${BACKEND_URL}/content/course/${courseId}`, {
      headers: { token }
    }),

  addSection: async (data, token) =>
    axios.post(`${BACKEND_URL}/content/section`, data, {
      headers: { token }
    }),

  addLecture: async (data, token) =>
    axios.post(`${BACKEND_URL}/content/lecture`, data, {
      headers: { token }
    })
};