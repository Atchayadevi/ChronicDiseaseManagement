import { useDispatch, useSelector } from "react-redux";
import { DepSelector } from "../Slices/DepSlice";
function DepartmentDropDown() {
  const dispatch = useDispatch();
  const SelectedDepartment = useSelector((state) => state.Dep);
  const onChangeDepartment = (event) => {
    dispatch(DepSelector(event.target.value));
  };

  return (
    <>
      <div className="flex flex-col lg:justify-center  space-y-2 p-3 md:flex-row md:items-center md:space-y-0 md:space-x-4 w-full mb-4">
        <label className="text-2xl  font-bold text-black md:w-1/4">
          {" "}
          Department
        </label>
        <select
          value={SelectedDepartment || ""}
          onChange={onChangeDepartment}
          className="w-3/4 lg:w-2/5 md:w-3/4 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
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
    </>
  );
}

export default DepartmentDropDown;
