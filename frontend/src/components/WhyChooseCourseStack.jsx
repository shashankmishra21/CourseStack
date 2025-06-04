import React from "react";
import {
  BookOpen,
  Briefcase,
  Users,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-10 w-10 text-yellow-300" />,
    title: "Quality Content",
    description: "Well-structured, up-to-date content curated by experts.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-yellow-300" />,
    title: "Expert-Led Courses",
    description: "Learn from professionals with real-world experience.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-yellow-300" />,
    title: "Career Focused",
    description: "Courses designed to boost your career with practical skills.",
  },
  {
    icon: <Users className="h-10 w-10 text-yellow-300" />,
    title: "Community Support",
    description: "Engage with peers and mentors in an active learning community.",
  },
  {
    icon: <Clock className="h-10 w-10 text-yellow-300" />,
    title: "Flexible Learning",
    description: "Access courses anytime, anywhere to fit your schedule.",
  },
  {
    icon: <Award className="h-10 w-10 text-yellow-300" />,
    title: "Certified Programs",
    description: "Earn certifications that add value to your resume.",
  },
];

const WhyChooseCourseStack = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-20 px-4 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          <span>Why Choose Course</span><span className=" text-yellow-300">Stack</span><span>?</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flip-card w-full h-64 perspective"
            >
              <div className="flip-card-inner w-full h-full transition-transform duration-700 ease-in-out">
                <div className="flip-card-front bg-gradient-to-br from-purple-800 via-purple-600 to-yellow-400 p-6 rounded-2xl shadow-2xl border-2 border-white flex flex-col justify-center items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                </div>
                <div className="flip-card-back bg-yellow-300 text-black p-6 rounded-2xl shadow-2xl border-2 border-white flex items-center justify-center">
                  <p className="text-lg font-medium">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCourseStack;
