import { useEffect, useState } from "react";
import axios from "axios";
import RegulationDropDown from "../DropDown/RegulationDropDown";
import YearDropDown from "../DropDown/YearDropDown";
import DepartmentDropDown from "../DropDown/DepartmentDropDown";
import SemesterDropDown from "../DropDown/SemesterDropDown";
import { useSelector } from "react-redux";
function BookAvailableSeniorList() {
  const [availablebook, setAvailableBooks] = useState([]);
  const [filterBooks, setFilteredBooks] = useState([]);

  const year = useSelector((state) => state.year);
  const Regulation = useSelector((state) => state.Regulation);
  const sem = useSelector((state) => state.Sem);
  const Dep = useSelector((state) => state.Dep);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/availableBooks"
        );

        setAvailableBooks(response.data); // Assuming you have setBooks to store the data in state
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = availablebook.filter((book) => {
      return (
        (year === "" || year === book.Year) &&
        (Regulation === "" || Regulation === book.Regulation) &&
        (sem === "" || sem === book.semester) &&
        (Dep === "" || Dep === book.department)
      );
    });
    setFilteredBooks(filtered);
  }, [availablebook, year, Regulation, sem, Dep]);

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
            {filterBooks.map((book, index) => (
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
                <td className="px-4 py-2 whitespace-nowrap">{book.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BookAvailableSeniorList;
