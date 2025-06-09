import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreatorCourses = async () => {
            const token = localStorage.getItem("creatorToken"); // ✅ Correct key used
            if (!token) {
                toast.error("You need to be logged in as a creator");
                navigate("/creator/signin");
                return;
            }

            try {
                const res = await axios.get("http://localhost:3000/api/admin/course/bulk", {
                    headers: {
                        token: token,
                    },
                });

                const courseData = res.data.courses || [];
                setCourses(courseData);
            } catch (error) {
                console.error("Error fetching creator courses:", error);
                toast.error("Failed to fetch your courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCreatorCourses();
    }, [navigate]);

    if (loading) {
        return (
            <div className="text-center text-xl font-medium mt-20">Loading your courses...</div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-purple-50 px-4 py-5">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mb-6 px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 text-center md:text-left">
                    Creator Dashboard
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-yellow-400 text-purple-800 font-semibold py-2 px-5 rounded-md hover:bg-yellow-300 transition"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/create-course')}
                        className="bg-purple-700 text-white font-semibold py-2 px-5 rounded-md hover:bg-purple-800 transition"
                    >
                        Create New Course
                    </button>
                </div>
            </div>

            {/* Section Title */}
            <h2 className="text-2xl font-semibold text-gray-700 px-10 mb-8">
                Your Created Courses
            </h2>

            {/* Courses Section */}
            {courses.length === 0 ? (
                <p className="text-center text-gray-700 text-lg bg-white rounded-xl shadow-md py-6 px-4 max-w-xl mx-auto">
                    You haven't created any courses yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-10">
                    {courses.map(course => (
                        <div
                            key={course._id}
                            className="bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-lg p-4"
                        >
                            <img
                                src={course.image?.url || "/placeholder.jpg"}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-purple-800">{course.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreatorDashboard;
