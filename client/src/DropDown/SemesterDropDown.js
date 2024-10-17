import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SemesterSelector } from "../Slices/SemesterSlice";
function SemesterDropDown() {
  const dispatch = useDispatch();
  const SelectedSemester = useSelector((state) => state.Sem);
  const onChangeSem = (event) => {
    dispatch(SemesterSelector(event.target.value));
  };

  return (
    <>
      <div className="flex flex-col lg:justify-center  space-y-2 md:flex-row md:items-center md:space-y-0 p-3 md:space-x-4 w-full mb-4">
        <label className="text-2xl font-bold text-black md:w-1/4">
          {" "}
          Semester
        </label>
        <select
          value={SelectedSemester || ""}
          onChange={onChangeSem}
          className="w-3/4 lg:w-2/5 md:w-3/4 px-3 py-2 bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        >
          <option value="" disabled>
            Select a semester
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
    </>
  );
}

export default SemesterDropDown;
