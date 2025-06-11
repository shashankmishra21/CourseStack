import React, { useState } from "react";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-violet-100 to-yellow-50 p-4">
      {!submitted ? (
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
            Contact Us
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-purple-700 font-semibold mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-base text-gray-800"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                required
                className="text-gray-800 w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-base"
              />
            </div>
            <div>
              <label className="block text-purple-700 font-semibold mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                required
                className="text-gray-800 w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 text-base"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-purple-700">
            Thank you! We will reach out to you.
          </h2>
          {/* <p className="text-sm mt-4 text-gray-600">
            Refresh the page to send another message.
          </p> */}
        </div>
      )}
    </div>
  );
};

export default ContactUs;
