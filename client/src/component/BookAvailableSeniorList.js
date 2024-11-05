import { useEffect, useState } from "react";
import axios from "axios";
import RegulationDropDown from "../DropDown/RegulationDropDown";
import YearDropDown from "../DropDown/YearDropDown";
import DepartmentDropDown from "../DropDown/DepartmentDropDown";
import SemesterDropDown from "../DropDown/SemesterDropDown";
import { useSelector } from "react-redux";

function BookAvailableSeniorList() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [otherAvailableBooks, setOtherAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOther, setLoadingOther] = useState(false); // New loading state for other books
  const [error, setError] = useState(null);

  const year = useSelector((state) => state.year);
  const regulation = useSelector((state) => state.Regulation);
  const semester = useSelector((state) => state.Sem);
  const department = useSelector((state) => state.Dep);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/availableBooks"
        );
        setAvailableBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const fetchOtherBooks = async () => {
    setLoadingOther(true); // Set loading state
    try {
      const response = await axios.get("http://localhost:8000/otherbooks");
      setOtherAvailableBooks(response.data);
    } catch (error) {
      console.error("Error fetching other available books:", error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoadingOther(false); // Reset loading state
    }
  };

  useEffect(() => {
    const filtered = availableBooks.filter((book) => {
      return (
        (year === "" || year === book.Year) &&
        (regulation === "" || regulation === book.Regulation) &&
        (semester === "" || semester === book.semester) &&
        (department === "" || department === book.department)
      );
    });
    setFilteredBooks(filtered);
  }, [availableBooks, year, regulation, semester, department]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex items-center justify-center p-2 bg-gradient-to-r bg-[#25154d]">
        <img
          src="/logo.jpeg" // Assuming the logo is placed in the public/images directory
          alt="BookBuddy Logo"
          className="h-16 w-16 mr-4" // Adjust the size as needed
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
          Jacsice BookBuddy Network
        </h1>
      </div>

      <div>
        <RegulationDropDown />
        <YearDropDown />
        <SemesterDropDown />
        <DepartmentDropDown />
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.bookTitle}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.Regulation}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.semester}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{book.Year}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.department}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.contact}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={fetchOtherBooks}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          {loadingOther ? "Loading..." : "Other Available books here"}
        </button>
      </div>

      {otherAvailableBooks.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <h2 className="text-xl text-center mb-4">Other Available Books</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {otherAvailableBooks.map((book, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap">{book.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.available}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {book.contact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default BookAvailableSeniorList;
