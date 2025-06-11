import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../utils/util';

const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image: { url: '', public_id: '' }
    });
    const navigate = useNavigate();

    const token = localStorage.getItem("creatorToken");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/admin/course/bulk`, {
                    headers: { token }
                });

                const courseToEdit = res.data.courses.find(c => c._id === id);
                if (!courseToEdit) return toast.error("Course not found");

                setCourse(courseToEdit);
                setForm({
                    title: courseToEdit.title,
                    description: courseToEdit.description,
                    price: courseToEdit.price,
                    image: courseToEdit.image || { url: '', public_id: '' }
                });
            } catch (err) {
                toast.error("Failed to load course");
            }
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BACKEND_URL}/admin/course`, {
                ...form,
                courseId: id
            }, {
                headers: { token }
            });

            toast.success("Course updated successfully");
            navigate("/creator-dashboard");
        } catch (err) {
            toast.error("Update failed");
            console.error(err);
        }
    };

    if (!course) return <p className="text-center mt-10 text-purple-700 text-lg">Loading course details...</p>;

    return (
        <div className="max-w-2xl mx-auto px-6 py-8 mt-0 bg-gradient-to-br from-white via-gray-100 to-purple-50 shadow-lg rounded-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">Update Course</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Course Title"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700 placeholder-gray-400"
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Course Description"
                    rows="5"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700 placeholder-gray-400"
                    required
                ></textarea>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price (INR)"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700 placeholder-gray-400"
                    required
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={form.image?.url}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            image: { ...prev.image, url: e.target.value }
                        }))
                    }
                    placeholder="Image URL"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700 placeholder-gray-400"
                />

                {/* <input
                    type="text"
                    name="publicId"
                    value={form.image?.public_id}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            image: { ...prev.image, public_id: e.target.value }
                        }))
                    }
                    placeholder="Image Public ID"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 text-gray-700 placeholder-gray-400"
                /> */}

                <button
                    type="submit"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out"
                >
                    Update Course
                </button>
            </form>
        </div>
    );
};

export default UpdateCourse;
