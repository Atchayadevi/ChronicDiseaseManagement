import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import emailjs from "@emailjs/browser";
const Prescriptions = () => {
  const [patientName, setPatientName] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", instructions: "" },
  ]);

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", instructions: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctor = JSON.parse(localStorage.getItem("user"));
    if (!doctor?.userId) {
      alert("Doctor not logged in");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/patients/${patientName}/prescriptions`,
        {
          doctorId: doctor.userId,
          doctorName: doctor.name, // send doctor name
          doctorEmail: doctor.mailId, // send doctor email
          patientEmail: patientName, // assuming input is patient's email
          medicines,
        }
      );

      alert("Prescription submitted!");
      setPatientName("");
      setMedicines([{ name: "", dosage: "", instructions: "" }]);
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to submit prescription.");
    }
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center">
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

        <div className="min-h-screen text-white p-6">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Prescription
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Patient mailId"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full p-3 rounded-md text-black border border-grey-600"
                required
              />

              {medicines.map((med, index) => (
                <div
                  key={index}
                  className="bg-white/20 p-4 rounded-md space-y-2"
                >
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) =>
                      handleMedicineChange(index, "name", e.target.value)
                    }
                    className="w-full p-2 rounded-md text-black border border-grey-600"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g., 1 tablet twice a day)"
                    value={med.dosage}
                    onChange={(e) =>
                      handleMedicineChange(index, "dosage", e.target.value)
                    }
                    className="w-full p-2 rounded-md text-black border border-grey-600"
                  />
                  <textarea
                    placeholder="Instructions"
                    value={med.instructions}
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "instructions",
                        e.target.value
                      )
                    }
                    className="w-full p-2 rounded-md text-black border border-grey-600"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addMedicine}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                + Add Another Medicine
              </button>

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg mt-4"
              >
                Submit Prescription
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
