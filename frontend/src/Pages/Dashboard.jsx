import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/util";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You need to be logged in");
        navigate("/signin");
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: {
            token,
          },
        });

        const courseData = res.data.courseData || [];
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
        toast.error("Failed to fetch purchased courses");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [navigate]);

  const totalCourses = courses.length;

  const totalValue = useMemo(() => {
    return courses.reduce((sum, course) => sum + Number(course.price || 0), 0);
  }, [courses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
        <div className="mx-auto max-w-7xl animate-pulse space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="h-8 w-44 rounded-xl bg-slate-200" />
              <div className="mt-2 h-4 w-72 rounded bg-slate-200" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-24 rounded-xl bg-slate-200" />
              <div className="h-10 w-36 rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="mt-3 h-8 w-24 rounded bg-slate-200" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-44 bg-slate-200" />
                <div className="p-5">
                  <div className="h-6 w-3/4 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
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
        <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-6">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#082567]">
              Learner Workspace
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Access the courses you’ve purchased and continue learning from where you left off.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/preview-course")}
              className="inline-flex items-center justify-center rounded-xl bg-[#082567] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#041B57]"
            >
              Explore Courses
            </button>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Purchased Courses
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{totalCourses}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Total Value
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₹{totalValue}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
              Your purchased courses
            </h2>
            <p className="text-sm text-slate-500">
              Open any course and continue learning.
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              You haven’t purchased any courses yet
            </h3>
            <p className="mt-3 text-slate-600">
              Explore available courses and start building your learning dashboard.
            </p>
            <button
              onClick={() => navigate("/preview-course")}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#082567] px-5 py-3 text-sm font-semibold text-white hover:bg-[#041B57]"
            >
              Explore Courses
            </button>
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
                      Purchased
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-lg font-bold tracking-tight text-slate-900">
                      {course.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#EEF4FF] px-3 py-1 text-sm font-semibold text-[#082567]">
                      ₹{course.price}
                    </span>
                  </div>

                  <p className="min-h-[64px] text-sm leading-6 text-slate-600 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="mt-5">
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#082567] px-4 py-3 text-sm font-semibold text-white hover:bg-[#041B57]"
                    >
                      Continue Learning
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

export default Dashboard;