import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListAvailableBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [contactDetails, setContactDetails] = useState({});

  const [selectedRegulation, setSelectedRegulation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [bookname, setbookname] = useState("");

  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch books from the backend
  useEffect(() => {
    axios
      .get("https://books-serverside.onrender.com/getbooks")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter books based on year, department, regulation, semester
  useEffect(() => {
    const filtered = books.filter((book) => {
      return (
        (selectedYear === "" || selectedYear === book.Year) &&
        (selectedRegulation === "" || selectedRegulation === book.Regulation) &&
        (selectedSemester === "" || selectedSemester === book.semester) &&
        (selectedDepartment === "" || selectedDepartment === book.department) &&
        (bookname === "" ||
          (book.bookTitle &&
            book.bookTitle.toLowerCase().includes(bookname.toLowerCase())))
      );
    });
    setFilteredBooks(filtered);
  }, [
    books,
    selectedYear,
    selectedRegulation,
    selectedSemester,
    selectedDepartment,
    bookname,
  ]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        const response = await axios.get(
          "https://books-serverside.onrender.com/user-details",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request
            },
          }
        );

        setUser(response.data.user); // Save user details
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

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
  const handleActivate = async (book, index) => {
    const contact = contactDetails[index] || "";

    if (contact.length === 10) {
      const bookDetails = {
        ...book,
        contact,
        isAvailable: true,
        userId: user.userId,
      };

      try {
        // Send data to backend to store in DB
        const response = await axios.post(
          "https://books-serverside.onrender.com/availableBooks",
          bookDetails
        );

        alert(response.data); // Show success or failure message

        // Clear the contact detail after successful submission
        setContactDetails((prev) => ({
          ...prev,
          [index]: "",
        }));
      } catch (err) {
        // Handle error
        if (err.response && err.response.status === 409) {
          alert("You have already added the book details."); // Alert if book details exist
        } else {
          console.error("Error:", err);
          console.log("Book Details:", bookDetails);
        }
      }
    } else {
      alert("Please enter a valid 10-digit contact number.");
    }
  };

  return (
    <>
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
              src="/logo.jpeg" // Assuming the logo is placed in the public/images directory
              alt="BookBuddy Logo"
              className="h-16 w-16 mr-4 md:h-20 md:w-20 rounded-full"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
              JACSICE BookNest
            </h1>
          </div>
          {/* Right side: Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/seniorsite");
              }}
              className="bg-violet-600 text-[#e8e8e8] py-2 px-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition duration-200"
            >
              Your site
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6 bg-violet-600 rounded m-2 mx-auto w-full lg:w-2/3">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full ">
          <label className="text-2xl font-bold text-black lg:w-1/4">
            Filter by book name
          </label>
          <input
            type="text"
            value={bookname}
            onChange={(e) => setbookname(e.target.value)}
            placeholder="Enter book name"
            className="  lg:w-2/5  px-3 py-2 border rounded-md  focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2  block w-full sm:text-sm border-black"
          />
        </div>
        {/* Regulation Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full">
          <label className="text-2xl font-bold text-black lg:w-1/4">
            Regulation
          </label>
          <select
            value={selectedRegulation}
            onChange={(e) => setSelectedRegulation(e.target.value)}
            className="w-full lg:w-2/5 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a Regulation
            </option>
            <option value="2017">2017</option>
            <option value="2021">2021</option>
          </select>
        </div>

        {/* Department Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full">
          <label className="text-2xl font-bold text-black lg:w-1/4">
            Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full lg:w-2/5 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a Department
            </option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="CIVIL">CIVIL</option>
            <option value="AI & DS">AI & DS</option>
          </select>
        </div>

        {/* Semester Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full">
          <label className="text-2xl font-bold text-black lg:w-1/4">
            Semester
          </label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full lg:w-2/5 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a Semester
            </option>
            <option value="I sem">I sem</option>
            <option value="II sem">II sem</option>
            <option value="III sem">III sem</option>
            <option value="IV sem">IV sem</option>
            <option value="V sem">V sem</option>
            <option value="VI sem">VI sem</option>
            <option value="VII sem">VII sem</option>
            <option value="VIII sem">VIII sem</option>
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full">
          <label className="text-2xl font-bold text-black lg:w-1/4">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full lg:w-2/5 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a Year
            </option>
            <option value="I Year">I Year</option>
            <option value="II Year">II Year</option>
            <option value="III Year">III Year</option>
            <option value="IV Year">IV Year</option>
          </select>
        </div>
      </div>
      <div className=" flex justify-center items-center ">
        <button
          onClick={() => navigate("/addotherbooks")}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          other books? Add here
        </button>
      </div>

      <div className=" overflow-x-auto">
        <table className=" min-w-full bg-white">
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
                    className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-600 disabled:opacity-50"
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
