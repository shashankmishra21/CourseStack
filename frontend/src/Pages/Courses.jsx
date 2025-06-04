import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar"

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/course/preview");
      setCourses(res.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-300 via-sky-200 to-white">
        <div className="text-purple-700 text-xl animate-pulse font-semibold">
          Loading courses...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-sky-100 to-white px-4 py-0">
     
      <Navbar/>
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-14">
        Explore Our Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] duration-300 ease-in-out"
            >
              {/* Image */}
              <img
                src={course.image?.url || "/placeholder.jpg"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-2xl border-b border-purple-100"
              />

              {/* Content */}
              <div className="p-6 text-gray-800">
                <h3 className="text-2xl font-semibold mb-2 text-purple-800">{course.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-yellow-600 font-bold text-lg">₹{course.price}</span>
                  <button className="bg-yellow-300 text-yellow-900 font-medium py-2 px-5 rounded-full hover:bg-yellow-400 transition duration-300 shadow">
                    Enroll
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
