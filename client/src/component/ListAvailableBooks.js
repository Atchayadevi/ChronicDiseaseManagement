import YearDropDown from "../DropDown/YearDropDown";
import RegulationDropDown from "../DropDown/RegulationDropDown";
import SemesterDropDown from "../DropDown/SemesterDropDown";
import DepartmentDropDown from "../DropDown/DepartmentDropDown";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function ListAvailableBooks() {
  const year = useSelector((state) => state.year);
  const Regulation = useSelector((state) => state.Regulation);
  const sem = useSelector((state) => state.Sem);
  const Dep = useSelector((state) => state.Dep);

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [contactDetails, setContactDetails] = useState({});

  // Fetch books from the backend
  useEffect(() => {
    axios
      .get("https://books-cfj1.onrender.com/getbooks")
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
        .post("http://localhost:8000/availableBooks", bookDetails)
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

      <ul>
        <li>{year}</li>
        <li>{Regulation}</li>
        <li>{sem}</li>
        <li>{Dep}</li>
      </ul>

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
