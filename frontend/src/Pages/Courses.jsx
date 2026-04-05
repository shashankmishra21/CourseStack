import { useEffect, useState } from "react";
import axios from "axios";
import PurchaseCourse from "./PurchaseCourse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/util";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasingCourseId, setPurchasingCourseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/course/preview`);
        setCourses(res.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
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
      if (result?.message) {
        toast.success(result.message);
      } else {
        toast.error("Purchase failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setPurchasingCourseId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="h-8 w-56 rounded-xl bg-slate-200" />
              <div className="mt-2 h-4 w-72 rounded bg-slate-200" />
            </div>
            <div className="h-10 w-24 rounded-xl bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-44 bg-slate-200" />
                <div className="p-5">
                  <div className="h-6 w-3/4 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-6 w-20 rounded bg-slate-200" />
                    <div className="h-9 w-28 rounded-xl bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-6">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#082567]">
              Explore Courses
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Learn with premium creator-led courses
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Browse structured courses with preview access, clean content layout, and guided lessons.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Home
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">No courses available</h2>
            <p className="mt-3 text-slate-600">
              Courses will appear here once creators publish them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image?.url || "/placeholder.jpg"}
                    alt={course.title}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-800 shadow">
                      Course
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="line-clamp-2 text-lg font-bold tracking-tight text-slate-900">
                      {course.title}
                    </h2>
                    <span className="shrink-0 rounded-full bg-[#EEF4FF] px-3 py-1 text-sm font-semibold text-[#082567]">
                      ₹{course.price}
                    </span>
                  </div>

                  <p className="min-h-[64px] text-sm leading-6 text-slate-600 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={purchasingCourseId === course._id}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#082567] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#041B57] disabled:opacity-60"
                    >
                      {purchasingCourseId === course._id ? "Enrolling..." : "Enroll Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;