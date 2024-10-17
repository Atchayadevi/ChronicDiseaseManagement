import { useDispatch, useSelector } from "react-redux";
import { RegulationSelector } from "../Slices/RegulationSlice";

function RegulationDropDown() {
  const dispatch = useDispatch();
  const SelectedRegulation = useSelector((state) => state.Regulation);

  const onhandleChange = (event) => {
    dispatch(RegulationSelector(event.target.value));
  };

  return (
    <div className="flex flex-col  lg:justify-center  space-y-2 md:flex-row md:items-center p-3 ml- md:space-y-0 md:space-x-4 w-full mb-4">
      <label className="text-2xl font-bold text-black md:w-1/4">
        Regulation
      </label>
      <select
        onChange={onhandleChange}
        value={SelectedRegulation}
        className="w-3/4 lg:w-2/5  md:w-3/4 px-3 py-2  bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      >
        <option value="" disabled>
          Select a Regulation
        </option>
        <option value="2017">2017</option>
        <option value="2021">2021</option>
      </select>
    </div>
  );
}

export default RegulationDropDown;
