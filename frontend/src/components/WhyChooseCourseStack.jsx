import React from "react";
import Slider from "react-slick";
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

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
};

const WhyChooseCourseStack = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-20 px-4 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Why Choose <span className="text-yellow-300">CourseStack</span>?
        </h2>

        {/* Slider for small screens */}
        <div className="block md:hidden">
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <div key={index} className="px-4">
                <div className="bg-gradient-to-br from-purple-800 via-purple-600 to-yellow-400 p-6 rounded-2xl shadow-lg border-2 border-white min-h-[280px] flex flex-col items-center justify-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{feature.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Grid for medium and large screens */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-800 via-purple-600 to-yellow-400 p-6 rounded-2xl shadow-lg border-2 border-white min-h-[250px] flex flex-col items-center justify-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2 text-sm text-white/90 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCourseStack;
