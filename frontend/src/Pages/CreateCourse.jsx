import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !image) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("creatorToken");

      const res = await axios.post(
        "http://localhost:3000/api/admin/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token
          }
        }
      );


      toast.success(res.data.message || "Course created successfully!");
      console.log(res.data.message || "Course created successfully!");
      navigate('/creator-dashboard');
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error("Error creating course:", err);
      console.error(" SERVER ERROR:", err);

      toast.error(err?.response?.data?.message || "Failed to create course.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-violet-100 to-yellow-50 text-white p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Course</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 mb-4 rounded bg-violet-50 border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            className="w-full p-2 mb-4 rounded bg-violet-50 border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            className="w-full p-2 mb-4 rounded bg-violet-50 border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 mb-4 rounded bg-yellow-50 border border-yellow-200"
            onChange={handleImageChange}
            required
          />

          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow" />
            </div>
          )}

          <button type="submit"
            className="w-full bg-violet-600 text-white font-semibold py-2 rounded hover:bg-violet-700 transition">Create Course</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
