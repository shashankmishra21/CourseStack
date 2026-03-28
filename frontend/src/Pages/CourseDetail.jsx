import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/util";
import PurchaseCourse from "./PurchaseCourse";

const getYoutubeEmbedUrl = (url = "") => {
  try {
    if (url.includes("youtube.com/embed/")) return url;

    const parsed = new URL(url);
    const videoId =
      parsed.searchParams.get("v") ||
      parsed.pathname.split("/").filter(Boolean).pop();

    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [curriculum, setCurriculum] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  const token = localStorage.getItem("token");

  const flatLectures = useMemo(() => {
    if (!curriculum?.sections) return [];
    return curriculum.sections.flatMap((section) =>
      section.lectures.map((lecture) => ({
        ...lecture,
        sectionTitle: section.title,
      }))
    );
  }, [curriculum]);

  const fetchPublicCurriculum = async () => {
    const res = await axios.get(`${BACKEND_URL}/content/curriculum/${courseId}`);
    setCurriculum(res.data);
    setIsPurchased(false);

    const firstPreview = res.data.sections
      ?.flatMap((section) => section.lectures)
      ?.find((lecture) => lecture.isPreview);

    setSelectedLecture(firstPreview || null);
  };

  const fetchProtectedContent = async () => {
    const res = await axios.get(`${BACKEND_URL}/content/course/${courseId}`, {
      headers: { token },
    });

    setCurriculum(res.data);
    setIsPurchased(res.data.isPurchased);

    const firstAvailable = res.data.sections
      ?.flatMap((section) => section.lectures)
      ?.find((lecture) => !lecture.isLocked);

    setSelectedLecture(firstAvailable || null);
  };

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        if (token) {
          try {
            await fetchProtectedContent();
          } catch {
            await fetchPublicCurriculum();
          }
        } else {
          await fetchPublicCurriculum();
        }
      } catch (error) {
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      setPurchasing(true);
      const result = await PurchaseCourse(courseId);
      if (result?.message) {
        toast.success(result.message);
        await fetchProtectedContent();
      }
    } catch (error) {
      toast.error(error.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  const handleLectureSelect = (lecture) => {
    if (lecture.isLocked) {
      toast.info("Purchase the course to unlock this lecture");
      return;
    }
    setSelectedLecture(lecture);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
        <div className="text-xl font-semibold text-purple-800 animate-pulse">
          Loading course...
        </div>
      </div>
    );
  }

  if (!curriculum?.course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-500">Course not found</div>
      </div>
    );
  }

  const selectedEmbedUrl =
    selectedLecture?.videoType === "youtube"
      ? getYoutubeEmbedUrl(selectedLecture.videoUrl)
      : selectedLecture?.videoUrl;

  const totalLectures = flatLectures.length;
  const previewLectures = flatLectures.filter((lecture) => lecture.isPreview).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4ff] via-white to-[#fdf8e8] px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/preview-course")}
          className="mb-6 bg-yellow-400 text-purple-800 font-semibold py-2 px-5 rounded-md hover:bg-yellow-300 transition shadow"
        >
          ← Back to Courses
        </button>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-purple-100 shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
                {curriculum.course.title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-5 max-w-3xl">
                {curriculum.course.description}
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                  {curriculum.sections.length} sections
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                  {totalLectures} lectures
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  {previewLectures} preview
                </span>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col items-start lg:items-end gap-3">
              <span className="text-3xl md:text-4xl font-bold text-yellow-600">
                ₹{curriculum.course.price}
              </span>

              {isPurchased ? (
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  Purchased ✓
                </span>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={purchasing}
                  className="bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white font-semibold py-3 px-8 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-lg disabled:opacity-70"
                >
                  {purchasing ? "Enrolling..." : "Enroll Now"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-purple-100 shadow-xl p-5 md:p-6 h-fit lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Course Content</h2>

            <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
              {curriculum.sections.map((section) => (
                <div key={section._id}>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    {section.title}
                  </h3>

                  <div className="space-y-2">
                    {section.lectures.map((lecture) => {
                      const isActive = selectedLecture?._id === lecture._id;

                      return (
                        <button
                          key={lecture._id}
                          onClick={() => handleLectureSelect(lecture)}
                          className={`w-full text-left rounded-2xl p-3 transition border ${
                            isActive
                              ? "bg-purple-50 border-purple-300 shadow"
                              : "bg-gray-50 border-transparent hover:bg-purple-50/60"
                          } ${lecture.isLocked ? "opacity-80" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-gray-800">{lecture.title}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {lecture.duration} sec
                              </p>
                            </div>

                            <div className="shrink-0">
                              {lecture.isLocked ? (
                                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                  🔒
                                </div>
                              ) : lecture.isPreview ? (
                                <div className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center text-sm">
                                  ▶
                                </div>
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center text-sm">
                                  ✓
                                </div>
                              )}
                            </div>
                          </div>

                          {lecture.isPreview && !lecture.isLocked && (
                            <span className="inline-block mt-2 text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                              Preview
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-purple-100 shadow-xl p-5 md:p-6">
            <div className="bg-gradient-to-r from-slate-900 via-[#08152f] to-slate-900 rounded-3xl p-4 md:p-6 text-white shadow-inner">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">
                  {selectedLecture ? selectedLecture.title : "Video Player"}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {selectedLecture
                    ? selectedLecture.description || "No description available"
                    : "Select a lecture to start learning"}
                </p>
              </div>

              <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center">
                {!selectedLecture ? (
                  <p className="text-gray-400 text-lg">Select a lecture to start learning</p>
                ) : selectedLecture.isLocked ? (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-6">
                    <div className="text-5xl mb-4">🔒</div>
                    <h4 className="text-2xl font-bold mb-2">This lecture is locked</h4>
                    <p className="text-gray-300 mb-5">
                      Purchase the course to unlock all premium lectures.
                    </p>
                    {!isPurchased && (
                      <button
                        onClick={handleEnroll}
                        disabled={purchasing}
                        className="bg-yellow-400 text-purple-900 font-semibold py-3 px-6 rounded-2xl hover:bg-yellow-300 transition"
                      >
                        {purchasing ? "Processing..." : `Enroll for ₹${curriculum.course.price}`}
                      </button>
                    )}
                  </div>
                ) : selectedLecture.videoType === "youtube" && selectedEmbedUrl ? (
                  <iframe
                    className="w-full h-full"
                    src={selectedEmbedUrl}
                    title={selectedLecture.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedLecture.videoType === "upload" ? (
                  <video
                    key={selectedLecture._id}
                    controls
                    className="w-full h-full"
                    src={selectedLecture.videoUrl}
                  />
                ) : (
                  <p className="text-gray-400 text-lg">Video format not supported</p>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                <p className="text-sm text-gray-500">Selected Section</p>
                <p className="font-semibold text-purple-800 mt-1">
                  {selectedLecture?.sectionTitle || "—"}
                </p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-yellow-700 mt-1">
                  {selectedLecture ? `${selectedLecture.duration} sec` : "—"}
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                <p className="text-sm text-gray-500">Access</p>
                <p className="font-semibold text-green-700 mt-1">
                  {!selectedLecture
                    ? "—"
                    : selectedLecture.isLocked
                    ? "Locked"
                    : selectedLecture.isPreview
                    ? "Preview"
                    : "Unlocked"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;