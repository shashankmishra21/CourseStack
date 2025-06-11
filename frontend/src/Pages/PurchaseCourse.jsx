import axios from 'axios';
import { BACKEND_URL } from '../utils/util';

export const PurchaseCourse = async (courseId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in to enroll.');
    return;
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}/course/purchase`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    // alert(response.data.message || 'Enrolled successfully!');
    return response.data;
  } catch (error) {
    console.error('Purchase failed:', error);
    alert(error.response?.data?.message || 'Failed to enroll.');
  }
};

export default PurchaseCourse;
