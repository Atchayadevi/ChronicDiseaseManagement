import React from "react";
import Sidebar from "./Sidebar";

const Contact = () => {
  return (
    <div className="flex min-h-screen bg-cover bg-center">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-center p-4 bg-gradient-to-r bg-[#25154d]">
          <img
            src="/icons.png" 
            alt="BookBuddy Logo"
            className="h-16 w-16 mr-4 md:h-20 md:w-20 rounded-full"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
            Chronic Disease Management
          </h1>
        </div>

        <div className="min-h-screen  text-[#3d1957] p-6">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Help & Support
            </h1>

            {/* FAQs */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <ul className="space-y-4">
                <li>
                  <strong>Q:</strong> How do I register as a doctor?
                  <br />
                  <strong>A:</strong> Click on the "Doctors" section in the
                  sidebar and fill out the registration form.
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <form className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="p-3 rounded-md border border-gray-300 text-black"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="p-3  border border-gray-300 rounded-md text-black"
                />
                <textarea
                  rows="4"
                  placeholder="Describe your issue..."
                  required
                  className="p-3  border border-gray-300 rounded-md text-black"
                />
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
