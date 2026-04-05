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

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
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

  const handleLectureSelect = (lecture, sectionTitle) => {
    if (lecture.isLocked) {
      toast.info("Purchase the course to unlock this lecture");
      return;
    }
    setSelectedLecture({ ...lecture, sectionTitle });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] px-4 py-5 md:px-6 md:py-6">
        <div className="mx-auto max-w-7xl animate-pulse space-y-4">
          <div className="h-9 w-28 rounded-xl bg-slate-200" />
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-8 w-1/2 rounded-lg bg-slate-200" />
            <div className="mt-3 h-4 w-full rounded bg-slate-200" />
            <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 flex gap-3">
              <div className="h-9 w-20 rounded-full bg-slate-200" />
              <div className="h-9 w-20 rounded-full bg-slate-200" />
              <div className="h-9 w-20 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="h-[520px] rounded-3xl border border-slate-200 bg-white shadow-sm" />
            <div className="h-[520px] rounded-3xl border border-slate-200 bg-white shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (!curriculum?.course) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Course not found</h2>
          <p className="mt-2 text-sm text-slate-600">
            The course you are looking for is unavailable or may have been removed.
          </p>
          <button
            onClick={() => navigate("/preview-course")}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#082567] px-5 py-3 text-sm font-semibold text-white hover:bg-[#041B57]"
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const selectedEmbedUrl =
    selectedLecture?.videoType === "youtube"
      ? getYoutubeEmbedUrl(selectedLecture.videoUrl)
      : selectedLecture?.videoUrl;

  const totalLectures = flatLectures.length;
  const previewLectures = flatLectures.filter((lecture) => lecture.isPreview).length;
  const unlockedLectures = flatLectures.filter((lecture) => !lecture.isLocked).length;

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-4 md:px-6 md:py-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("/preview-course")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Back
          </button>

          {!isPurchased && (
            <button
              onClick={handleEnroll}
              disabled={purchasing}
              className="inline-flex items-center justify-center rounded-xl bg-[#082567] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#041B57] disabled:opacity-70 lg:hidden"
            >
              {purchasing ? "Processing..." : `Buy ₹${curriculum.course.price}`}
            </button>
          )}
        </div>

        <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#EEF4FF] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#082567]">
                  Premium Course
                </span>
                {isPurchased && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Purchased
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {curriculum.course.title}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 md:text-[15px]">
                {curriculum.course.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {curriculum.sections.length} sections
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {totalLectures} lectures
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {previewLectures} preview
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                  {unlockedLectures} available
                </span>
              </div>
            </div>

            <div className="w-full lg:max-w-[280px]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Price
                </p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <h2 className="text-3xl font-bold text-slate-900">
                    ₹{curriculum.course.price}
                  </h2>

                  {isPurchased ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#082567]">
                      Full access
                    </span>
                  )}
                </div>

                <div className="mt-4 hidden lg:block">
                  {isPurchased ? (
                    <div className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white">
                      Purchased
                    </div>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={purchasing}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#082567] px-4 py-3 text-sm font-semibold text-white hover:bg-[#041B57] disabled:opacity-70"
                    >
                      {purchasing ? "Processing..." : "Enroll now"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="order-2 lg:order-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Curriculum</h2>
                  <p className="text-xs text-slate-500">Select a lecture to continue</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {totalLectures}
                </span>
              </div>

              <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
                {curriculum.sections.map((section, sectionIndex) => (
                  <div
                    key={section._id}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3"
                  >
                    <div className="mb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Section {sectionIndex + 1}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">
                        {section.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {section.lectures.map((lecture, lectureIndex) => {
                        const isActive = selectedLecture?._id === lecture._id;

                        return (
                          <button
                            key={lecture._id}
                            onClick={() => handleLectureSelect(lecture, section.title)}
                            className={`w-full rounded-2xl border p-3 text-left transition ${
                              isActive
                                ? "border-[#2F61D5] bg-[#EEF4FF]"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium text-slate-400">
                                  Lecture {lectureIndex + 1}
                                </p>
                                <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
                                  {lecture.title}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {formatDuration(lecture.duration)}
                                </p>
                              </div>

                              <div className="shrink-0">
                                {lecture.isLocked ? (
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm">
                                    🔒
                                  </div>
                                ) : lecture.isPreview ? (
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DFF8F1] text-sm text-[#12B8A6]">
                                    ▶
                                  </div>
                                ) : (
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-sm text-[#082567]">
                                    ✓
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {lecture.isPreview && !lecture.isLocked && (
                                <span className="rounded-full bg-[#DFF8F1] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0E9F8F]">
                                  Preview
                                </span>
                              )}
                              {lecture.isLocked && (
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                                  Locked
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="order-1 lg:order-2 space-y-4">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-4 py-4 md:px-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedLecture ? selectedLecture.title : "Video Player"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedLecture
                        ? selectedLecture.description ||
                          "No description available for this lecture."
                        : "Select a lecture from the curriculum to start learning."}
                    </p>
                  </div>

                  {selectedLecture && (
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {selectedLecture.sectionTitle || "Section"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {formatDuration(selectedLecture.duration)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 md:p-4">
                <div className="relative aspect-video overflow-hidden rounded-[22px] bg-slate-950">
                  {!selectedLecture ? (
                    <div className="flex h-full items-center justify-center text-center text-slate-400">
                      Select a lecture to start learning
                    </div>
                  ) : selectedLecture.isLocked ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#041B57]/95 px-6 text-center text-white">
                      <div className="mb-4 text-5xl">🔒</div>
                      <h4 className="text-2xl font-bold">This lecture is locked</h4>
                      <p className="mt-2 max-w-md text-sm text-blue-100/80">
                        Purchase the course to unlock this lesson and continue the full curriculum.
                      </p>
                      {!isPurchased && (
                        <button
                          onClick={handleEnroll}
                          disabled={purchasing}
                          className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#082567] hover:bg-slate-100 disabled:opacity-70"
                        >
                          {purchasing
                            ? "Processing..."
                            : `Unlock full course for ₹${curriculum.course.price}`}
                        </button>
                      )}
                    </div>
                  ) : selectedLecture.videoType === "youtube" && selectedEmbedUrl ? (
                    <iframe
                      className="h-full w-full"
                      src={selectedEmbedUrl}
                      title={selectedLecture.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : selectedLecture.videoType === "upload" ? (
                    <video
                      key={selectedLecture._id}
                      controls
                      className="h-full w-full"
                      src={selectedLecture.videoUrl}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center text-slate-400">
                      Video format not supported
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Section
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selectedLecture?.sectionTitle || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Duration
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selectedLecture ? formatDuration(selectedLecture.duration) : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Access
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;