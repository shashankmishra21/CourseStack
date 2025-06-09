import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateCourse({ existingCourse }) {
  const [title, setTitle] = useState(existingCourse.title);
  const [description, setDescription] = useState(existingCourse.description);
  const [price, setPrice] = useState(existingCourse.price);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(existingCourse.image.url);
  const [publicId, setPublicId] = useState(existingCourse.image.public_id);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "coursestack"); // Replace with your Cloudinary preset

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dr3hxaxsd/image/upload",
        formData
      );

      setPublicId(res.data.public_id);
      setPreview(res.data.secure_url);
    } catch (err) {
      toast.error("Image upload failed!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      price,
      courseId: existingCourse._id,
      image: {
        public_id: publicId,
        url: preview,
      },
    };

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put("http://localhost:3000/api/admin/course", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Course updated successfully!");
    } catch (err) {
      toast.error("Failed to update course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-violet-100 to-yellow-50 text-white p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Course</h2>

        <form onSubmit={handleUpdate}>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 mb-4 rounded bg-violet-50 border border-violet-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            className="w-full p-2 mb-4 rounded bg-violet-50 border border-violet-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            className="w-full p-2 mb-4 rounded bg-violet-50 border border-violet-200"
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
          />

          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow" />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold py-2 rounded hover:bg-yellow-700 transition"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCourse;
