import { YearSelector } from "../Slices/YearSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function YearDropDown() {
  const dispatch = useDispatch();
  const onhandleYear = (event) => {
    dispatch(YearSelector(event.target.value));
  };

  const selectedYear = useSelector((state) => state.year);
  return (
    <>
      <div className="flex flex-col space-y-2 md:flex-row p-3  lg:justify-center md:items-center md:space-y-0 md:space-x-4 w-full mb-4">
        <label className="text-2xl text-black font-bold md:w-1/4"> Year</label>
        <select
          value={selectedYear}
          onChange={onhandleYear}
          className="w-3/4 lg:w-2/5 md:w-3/4 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        >
          <option value="" disabled>
            Select a semester
          </option>
          <option value="I Year">I Year</option>
          <option value="II Year">II Year</option>
          <option value="III Year">III Year</option>
          <option value="IV Year">IV Year</option>
        </select>
      </div>
    </>
  );
}

export default YearDropDown;
