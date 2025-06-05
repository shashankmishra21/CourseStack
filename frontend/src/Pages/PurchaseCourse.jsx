import axios from 'axios';

export const PurchaseCourse = async (courseId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in to enroll.');
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/api/course/purchase',
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // send JWT here
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
