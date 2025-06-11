import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/util';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchasedCourses = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('You need to be logged in');
                navigate('/signin');
                return;
            }

            try {
                const res = await axios.get(`${BACKEND_URL}/user/purchases`, {
                    headers: {
                        token: token,
                    },
                });
                const courseData = res.data.courseData || [];
                setCourses(courseData);
            } catch (error) {
                console.error('Error fetching purchased courses:', error);
                toast.error('Failed to fetch purchased courses');
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedCourses();
    }, [navigate]);

    if (loading) {
        return (
            <div className="text-center text-xl font-medium mt-20 px-4">
                Loading your courses...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4 py-4">

            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mb-6 gap-4 px-4">
                <h2 className="text-3xl font-bold text-gray-700 text-center md:text-left">
                    Dashboard
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-yellow-400 text-purple-800 font-semibold py-2 px-5 rounded-md hover:bg-yellow-300 transition w-full sm:w-auto"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/preview-course')}
                        className="bg-purple-700 text-white font-semibold py-2 px-5 rounded-md hover:bg-purple-800 transition w-full sm:w-auto"
                    >
                        Explore Courses
                    </button>
                </div>
            </div>


            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 px-4 sm:px-10 mb-6 sm:mb-8 text-center sm:text-left">
                Your Purchased Courses
            </h2>

            {/* Courses Section */}
            {courses.length === 0 ? (
                <p className="text-center text-white text-base sm:text-lg bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 backdrop-blur-md rounded-xl shadow-md py-6 px-4 max-w-xl mx-auto">
                    You haven't purchased any courses yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-7xl mx-auto mb-10 px-4">
                    {courses.map(course => (
                        <div
                            key={course._id}
                            className="bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-lg p-4 flex flex-col">
                            <img
                                src={course.image?.url || "/placeholder.jpg"}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-1">
                                {course.title}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                                {course.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
