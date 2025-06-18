import Sidebar from "./Sidebar"; // adjust path as needed
import { useNavigate } from "react-router-dom";
function MainPage() {
  const navigate = useNavigate();

  const showSeniorSide = () => navigate("/senior_registration");
  const showJuniorSide = () => navigate("/junior_registration");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="p-6">
          <div className="flex items-center justify-center p-4 bg-gradient-to-r bg-[#25154d]">
            <img
              src="/icons.png"
              alt="BookBuddy Logo"
              className="h-16 w-16 mr-4 md:h-20 md:w-20 rounded-full"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl text-white p-6 text-center">
              Chronic Disease Management
            </h1>
          </div>

          <h3 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-3xl text-sky-950 p-6 font-bold">
            🩺 Easily Manage Chronic Diseases with Telemedicine
          </h3>

          <h1 className="p-10 sm:p-28 lg:p-28 font-serif leading-loose md:p-20 text-center bg-pink-950 text-white text-3xl">
            Our telemedicine platform empowers patients with chronic conditions—like diabetes, hypertension, asthma, and heart disease—to receive continuous care without the need for frequent hospital visits...
          </h1>

          <div className="flex space-x-4 sm:space-x-10 md:space-x-14 lg:space-x-20 p-4 sm:p-6 md:p-8 lg:p-10 items-center justify-center">
            <button
              className="bg-blue-500 text-white py-3 px-6 font-bold text-lg rounded-lg hover:bg-blue-600"
              onClick={showSeniorSide}
            >
              Doctors
            </button>
            <button
              className="bg-green-500 text-white py-3 px-6 font-bold text-lg rounded-lg hover:bg-green-600"
              onClick={showJuniorSide}
            >
              Patients
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
