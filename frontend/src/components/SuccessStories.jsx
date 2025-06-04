import React from "react";

const devs = [
  {
    name: "Anita Sharma",
    role: "Software Engineer",
    company: "Google",
    image: "/placeholder.jpg",
    testimonial: "CourseStack helped me master the skills to land my dream job at Google!",
  },
  {
    name: "Rahul Verma",
    role: "Senior Developer",
    company: "Facebook",
    image: "/placeholder.jpg",
    testimonial: "The project-based learning gave me the edge I needed for Facebook interviews.",
  },
  {
    name: "Sneha Patel",
    role: "Frontend Engineer",
    company: "Amazon",
    image: "/placeholder.jpg",
    testimonial: "Thanks to CourseStack, I confidently cleared Amazon’s coding rounds.",
  },
  {
    name: "Karan Mehta",
    role: "Backend Engineer",
    company: "Netflix",
    image: "/placeholder.jpg",
    testimonial: "The deep-dive courses helped me excel and get placed at Netflix.",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black
 text-white py-16 px-6 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Success Stories
        </h2>
        <p className="text-yellow-300 mb-12 max-w-3xl mx-auto text-lg">
          Meet some of the amazing developers who learned with CourseStack and
          landed their dream jobs at top tech companies.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {devs.map(({ name, role, company, image, testimonial }, i) => (
            <div key={i}
              className="bg-white/10 backdrop-blur-md border border-purple-200 p-6 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg mb-4 object-cover"/>
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <p className="text-yellow-300 font-medium">{role}</p>
              <p className="text-purple-100 mb-3">{company}</p>
              <p className="text-sm italic text-gray-200 leading-relaxed">
                "{testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
