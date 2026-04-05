import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/util";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("creatorToken");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: { url: "", public_id: "" },
  });

  useEffect(() => {
    const fetchCourse = async () => {
      if (!token) {
        toast.error("Please log in as creator");
        navigate("/creator/signin");
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(`${BACKEND_URL}/admin/course/bulk`, {
          headers: { token },
        });

        const courseToEdit = res.data.courses.find((c) => c._id === id);

        if (!courseToEdit) {
          toast.error("Course not found");
          return;
        }

        setCourse(courseToEdit);
        setForm({
          title: courseToEdit.title || "",
          description: courseToEdit.description || "",
          price: courseToEdit.price || "",
          image: courseToEdit.image || { url: "", public_id: "" },
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        url: value,
      },
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price) {
      toast.error("Title, description, and price are required");
      return;
    }

    try {
      setSaving(true);

      await axios.put(
        `${BACKEND_URL}/admin/course`,
        {
          ...form,
          courseId: id,
        },
        {
          headers: { token },
        }
      );

      toast.success("Course updated successfully");
      navigate("/creator-dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
        <div className="mx-auto max-w-3xl animate-pulse space-y-4">
          <div className="h-9 w-28 rounded-xl bg-slate-200" />
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-8 w-48 rounded-lg bg-slate-200" />
            <div className="mt-2 h-4 w-72 rounded bg-slate-200" />
            <div className="mt-6 space-y-4">
              <div className="h-12 w-full rounded-xl bg-slate-200" />
              <div className="h-28 w-full rounded-xl bg-slate-200" />
              <div className="h-12 w-full rounded-xl bg-slate-200" />
              <div className="h-12 w-full rounded-xl bg-slate-200" />
              <div className="h-11 w-full rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Course not found</h2>
          <p className="mt-2 text-sm text-slate-600">
            The course you are trying to update could not be found.
          </p>
          <button
            onClick={() => navigate("/creator-dashboard")}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#082567] px-5 py-3 text-sm font-semibold text-white hover:bg-[#041B57]"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("/creator-dashboard")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Back
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#082567]">
                Creator Workspace
              </span>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Update Course
              </h1>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Edit your course details and keep your catalog updated professionally.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Course Title"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#082567] focus:ring-2 focus:ring-[#082567]/10"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Course Description"
                rows="5"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#082567] focus:ring-2 focus:ring-[#082567]/10"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (INR)"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#082567] focus:ring-2 focus:ring-[#082567]/10"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={form.image?.url || ""}
                onChange={handleImageChange}
                placeholder="Image URL"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#082567] focus:ring-2 focus:ring-[#082567]/10"
              />
            </div>

            {form.image?.url && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={form.image.url}
                  alt="Course preview"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#082567] px-4 py-3 text-sm font-semibold text-white hover:bg-[#041B57] disabled:opacity-70"
              >
                {saving ? "Updating..." : "Update Course"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/creator-dashboard")}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;