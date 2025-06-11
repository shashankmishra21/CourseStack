import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HiMenu, HiX } from 'react-icons/hi';
import { BACKEND_URL } from '../utils/util';

const CreatorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCreatorCourses = async () => {
            const token = localStorage.getItem("creatorToken");
            if (!token) {
                toast.error("You need to be logged in as a creator");
                navigate("/creator/signin");
                return;
            }

            try {
                const res = await axios.get(`${BACKEND_URL}/admin/course/bulk`, {
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
            <div className="flex justify-center items-center min-h-screen text-xl font-medium bg-white">
                Loading your courses...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-purple-50 px-4 py-6 relative">

            <div className="md:hidden flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Creator Dashboard</h3>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-purple-800 text-3xl"
                >
                    {sidebarOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Sidebar for mobile */}
            {sidebarOpen && (
                <div className="fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg p-6 z-50 transition-transform duration-300 ease-in-out md:hidden">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-4 text-2xl text-purple-800"
                    >
                        <HiX />
                    </button>
                    <div className="flex flex-col gap-4 mt-10">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-yellow-400 text-purple-800 font-semibold py-2 px-4 rounded-md hover:bg-yellow-300"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/create-course')}
                            className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-800"
                        >
                            Create Course
                        </button>
                        <button
                            onClick={() => navigate('/update-course')}
                            className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-800"
                        >
                            Update Course
                        </button>
                    </div>
                </div>
            )}

            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Creator Dashboard</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-yellow-400 text-purple-800 font-semibold py-2 px-4 rounded-md hover:bg-yellow-300"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate('/create-course')}
                        className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-800"
                    >
                        Create Course
                    </button>
                    {/* <button
                        onClick={() => navigate('/update-course')}
                        className="bg-purple-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-800"
                    >
                        Update Course
                    </button> */}
                </div>
            </div>


            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 px-2 sm:px-10 mb-6 text-center sm:text-left">
                Your Created Courses
            </h2>

            {/* Courses Section */}
            {courses.length === 0 ? (
                <p className="text-center text-gray-700 text-lg bg-white rounded-xl shadow-md py-6 px-4 max-w-xl mx-auto">
                    You haven't created any courses yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-10 px-2">
                    {courses.map(course => (
                        <div
                            key={course._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={course.image?.url || "/placeholder.jpg"}
                                alt={course.title}
                                className="w-full h-40 sm:h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-purple-800 mb-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    <span className="font-medium text-black">Price:</span> ₹{course.price}
                                </p>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{course.description}</p>

                                <button
                                    onClick={() => navigate(`/update-course/${course._id}`)}
                                    className="bg-yellow-500 text-white text-sm font-semibold py-1 px-3 rounded-md hover:bg-yellow-400"
                                >
                                    Edit Course
                                </button>
                            </div>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreatorDashboard;
