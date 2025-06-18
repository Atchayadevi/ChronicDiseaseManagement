import { useEffect, useState } from "react";
import axios from "axios";
import { IoCall } from "react-icons/io5";
import { ImAddressBook } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Sidebar from "./Sidebar";

function BookAvailableSeniorList() {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    condition: "",
    symptoms: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleEmailBooking = async (doctor, e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_h7frvuq",
        "template_tutr4bu",
        {
          to_name: doctor.name,
          to_email: doctor.mailId,
          message: `Patient Info:\nName: ${user.name}\nEmail: ${user.mailId}\nAge: ${formData.age}\nCondition: ${formData.condition}\nSymptoms: ${formData.symptoms}`,
        },
        "37W5LmEqaYQrvAmNO"
      );

      alert(`Booking email sent to Dr. ${doctor.name}`);
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/add-patient",
        {
          doctorEmail: doctor.mailId,
          patientId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      formData.age = "";
      formData.condition = "";
      formData.symptoms = "";
      setShowForm(false);
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/availableDoctors"
        );
        setAvailableDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
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
        <h1 className="text-2xl font-bold mb-6 text-center">
          Available Doctors
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableDoctors.map((doctor, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p>Email: {doctor.mailId}</p>
              <p>Gender: {doctor.gender}</p>
              <p>Specialist: {doctor.specialist}</p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`tel:${doctor.contact}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <IoCall className="mr-2" /> Call
                </a>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setShowForm(true);
                  }}
                >
                  <ImAddressBook className="mr-2" /> Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                Book Appointment with Dr. {selectedDoctor.name}
              </h2>
              <form
                onSubmit={(e) => handleEmailBooking(selectedDoctor, e)}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Health Condition"
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Symptoms / Notes"
                  value={formData.symptoms}
                  onChange={(e) =>
                    setFormData({ ...formData, symptoms: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  required
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Send Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookAvailableSeniorList;
