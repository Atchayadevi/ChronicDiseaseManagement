import YearDropDown from "../DropDown/YearDropDown";
import RegulationDropDown from "../DropDown/RegulationDropDown";
import SemesterDropDown from "../DropDown/SemesterDropDown";
import DepartmentDropDown from "../DropDown/DepartmentDropDown";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListAvailableBooks() {
  const year = useSelector((state) => state.year);
  const Regulation = useSelector((state) => state.Regulation);
  const sem = useSelector((state) => state.Sem);
  const Dep = useSelector((state) => state.Dep);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [contactDetails, setContactDetails] = useState({});

  // Fetch books from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/getbooks")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter books based on year, department, regulation, semester
  useEffect(() => {
    const filtered = books.filter((book) => {
      return (
        (year === "" || year === book.Year) &&
        (Regulation === "" || Regulation === book.Regulation) &&
        (sem === "" || sem === book.semester) &&
        (Dep === "" || Dep === book.department)
      );
    });
    setFilteredBooks(filtered);
  }, [books, year, Regulation, sem, Dep]);

  // Handle contact input for each book separately
  const handleContactChange = (event, index) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      // Validate 10 digits
      setContactDetails((prev) => ({
        ...prev,
        [index]: value,
      }));
    }
  };

  // Handle book availability activation
  // Handle book availability activation
  const handleActivate = (book, index) => {
    const contact = contactDetails[index] || "";

    if (contact.length === 10) {
      const bookDetails = {
        ...book,
        contact,
        isAvailable: true,
      };

      // Send data to backend to store in DB
      axios
        .post("https://books-cfj1.onrender.com/availableBooks", bookDetails) //https://books-cfj1.onrender.com   "http://localhost:8000/"
        .then((response) => {
          alert(response.data); // Show success or failure message
          setContactDetails((prev) => ({
            ...prev,
            [index]: "",
          }));
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            alert("You have already added the book details."); // Alert if book details exist
          } else {
            console.error(err);
          }
        });
    } else {
      alert("Please enter a valid 10-digit contact number.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-2 bg-gradient-to-r bg-[#25154d]">
        <img
          src="/logo.jpeg" // Assuming the logo is placed in the public/images directory
          alt="BookBuddy Logo"
          className="h-16 w-16 mr-4" // Adjust the size as needed
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white  p-6 text-center">
          Jacsice BookBuddy Network
        </h1>
      </div>
      <div>
        {" "}
        <RegulationDropDown />
      </div>

      <div>
        {" "}
        <YearDropDown />
      </div>
      <div>
        {" "}
        <SemesterDropDown />
      </div>
      <div>
        {" "}
        <DepartmentDropDown />
      </div>
      <div className="flex justify-center items-center ">
        <button
          onClick={() => navigate("/addotherbooks")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          other books? Add here
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book Title
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Regulation
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.map((book, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap">
                  {book.bookTitle}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {book.Regulation}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{book.semester}</td>
                <td className="px-4 py-2 whitespace-nowrap">{book.Year}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {book.department}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <input
                    type="text"
                    value={contactDetails[index] || ""}
                    onChange={(e) => handleContactChange(e, index)}
                    placeholder="Enter 10-digit contact number"
                    className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleActivate(book, index)}
                    disabled={
                      !contactDetails[index] ||
                      contactDetails[index].length !== 10
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    Activate Availability
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListAvailableBooks;
