import { useEffect, useState } from 'react';
import axios from 'axios';
import PurchaseCourse from './PurchaseCourse';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/util';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasingCourseId, setPurchasingCourseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/course/preview`);
        setCourses(res.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    setPurchasingCourseId(courseId);
    try {
      const result = await PurchaseCourse(courseId);
      if (result && result.message) {
        toast.success(result.message);
      } else {
        toast.error("Purchase failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setPurchasingCourseId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
        <div className="text-white text-xl md:text-2xl animate-pulse font-semibold">
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4 py-6 md:py-4">
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mb-10 gap-4 px-4">
        <h3 className="text-3xl font-bold text-gray-700 text-center md:text-left">
          Courses We Offer
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-400 text-purple-800 font-semibold py-2 px-5 rounded-md hover:bg-yellow-300 transition w-full sm:w-auto">
            Home
          </button>

        </div>
      </div>

      

      {courses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto px-2 md:px-0">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] duration-300 ease-in-out">
              {/* Image */}
              <img
                src={course.image?.url || "/placeholder.jpg"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-2xl border-b border-purple-100"
              />






              {/* Content */}
              <div className="p-5 md:p-6 text-gray-800">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-purple-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <span className="text-yellow-600 font-bold text-lg">
                    ₹{course.price}
                  </span>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-yellow-300 text-yellow-900 font-medium py-2 px-5 rounded-full hover:bg-yellow-400 transition duration-300 shadow disabled:opacity-60"
                    disabled={purchasingCourseId === course._id}>
                    {purchasingCourseId === course._id ? "Enrolling..." : "Enroll"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
