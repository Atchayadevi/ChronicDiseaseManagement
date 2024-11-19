import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddotherBooks = () => {
  const [title, setTitle] = useState("");
  const [available, setAvailable] = useState("");
  const [contact, setcontact] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://books-serverside.onrender.com/otherbooks",
        {
          title,
          available,
          contact,
        }
      );

      setMessage(response.data.message);
      setMessageColor("green"); // Success message in green
      setTitle("");
      setAvailable("");
      setcontact("");

      // Uncomment to navigate after submission
      // setTimeout(() => {
      //   navigate("/");
      // }, 1000);
    } catch (error) {
      setMessage(
        "Error: " +
          (error.response ? error.response.data.message : error.message)
      );
      setMessageColor("red"); // Error message in red
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 bg-gradient-to-r bg-[#25154d]">
        <img
          src="/logo.jpeg" // Assuming the logo is placed in the public/images directory
          alt="BookBuddy Logo"
          className="h-16 w-16 mr-4 md:h-20 md:w-20 rounded-full"
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
          JACSICE BookNest
        </h1>
      </div>
      <div className=" flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Add Available Books
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="available"
              >
                Availability
              </label>
              <input
                type="text"
                id="available"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
              >
                Add Book
              </button>
            </div>

            {message && (
              <h1 style={{ color: messageColor }} className="mt-4 text-center">
                {message}
              </h1>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddotherBooks;
