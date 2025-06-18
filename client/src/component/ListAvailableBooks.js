import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
function ListAvailableBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8000/getPatientsByDoctor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response.data", response.data);
        setBooks(response.data);
        // 'books' here will be 'patients'
      } catch (err) {
        console.log("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        const response = await axios.get("http://localhost:8000/user-details", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        console.log("/user-details.data", response.data);
        setUser(response.data.user); // Save user details
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  const handleAddPrescription = async (book, index) => {
       navigate("/prescription")
  };

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-4">
          <div className="bg-gradient-to-r bg-[#25154d] p-4">
            {/* Navbar container */}
            <div className="flex items-center justify-between flex-wrap space-y-4 md:space-y-0 md:flex-nowrap">
              {/* Left side: User info */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-white">
                {user ? (
                  <div className="flex flex-col items-center md:items-start">
                    <h1 className="text-lg md:text-xl font-semibold">
                      Welcome, {user.name || user.mailId}
                    </h1>
                    <p className="text-sm">{user.mailId}</p>
                  </div>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>

              <div className="flex items-center justify-center p-4 bg-gradient-to-r bg-[#25154d]">
                <img
                  src="/icons.png" // Assuming the logo is placed in the public/images directory
                  alt="BookBuddy Logo"
                  className="h-16 w-16 mr-4 md:h-20 md:w-20 rounded-full"
                />
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
                  Chronic Disease Management
                </h1>
              </div>
              {/* Right side: Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="bg-violet-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition duration-200"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-6">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Mail ID
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Health Issue
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((patient, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-blue-600 break-words">
                      {patient.mailId}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {patient.healthIssue}
                    </td>
                    <td className="px-6 py-4 text-green-700">
                      {patient.contact}
                    </td>

                    <td className="px-6 py-4 text-green-700">
                      <button
                        onClick={() => handleAddPrescription()}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add Prescription
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListAvailableBooks;
