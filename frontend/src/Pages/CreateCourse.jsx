import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/util";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
      const token = localStorage.getItem("creatorToken");

      const res = await axios.post(`${BACKEND_URL}/admin/course`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      toast.success(res.data.message || "Course created successfully!");
      navigate("/creator-dashboard");

      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error("Error creating course:", err);
      toast.error(err?.response?.data?.message || "Failed to create course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-6">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#082567]">
              Creator Studio
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Create Course
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Add the course details, upload a thumbnail, and publish a clean learning experience.
            </p>
          </div>

          <button
            onClick={() => navigate("/creator-dashboard")}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900 md:text-xl">Course details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Fill in the essential information learners will see first.
              </p>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#082567] focus:ring-4 focus:ring-[#EEF4FF]"
                  placeholder="e.g. Full Stack Development Bootcamp"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Description
                </label>
                <textarea
                  rows={6}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#082567] focus:ring-4 focus:ring-[#EEF4FF]"
                  placeholder="Describe what learners will achieve, who the course is for, and what it covers."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[180px_minmax(0,1fr)]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Price
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-slate-900 outline-none transition focus:border-[#082567] focus:ring-4 focus:ring-[#EEF4FF]"
                      placeholder="499"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Course Thumbnail
                  </label>
                  <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-center transition hover:border-[#082567]/40 hover:bg-[#EEF4FF]/50">
                    <div>
                      <span className="block text-sm font-semibold text-slate-800">
                        Upload image
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        PNG, JPG, WebP
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#082567] px-5 py-3 text-sm font-semibold text-white hover:bg-[#041B57] disabled:opacity-70"
                >
                  {submitting ? "Creating Course..." : "Create Course"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/creator-dashboard")}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Live preview</h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at how the course may appear to learners.
              </p>

              <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Course preview"
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-slate-100 text-sm text-slate-500">
                    Image preview will appear here
                  </div>
                )}

                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                      {title || "Your course title"}
                    </h3>
                    <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-sm font-semibold text-[#082567]">
                      ₹{price || "0"}
                    </span>
                  </div>

                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                    {description ||
                      "Your course description will appear here once you start writing it."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Publishing tips</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <li>Use a title that clearly explains the learning outcome.</li>
                <li>Keep the description specific, practical, and benefit-focused.</li>
                <li>Choose a clean thumbnail that looks good at small sizes.</li>
                <li>Set pricing that matches your course depth and value.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;