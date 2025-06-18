import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Doctors", path: "/senior_registration" },
    { label: "Patients", path: "/junior_registration" },
    { label: "Disease & Diet Guide", path: "/diet_guide" },
    { label: "Help & Support", path: "/contact" },
    { label: "Logout", path: "/" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-[#25154d] text-white min-h-screen p-5 pt-8 relative duration-300 ${
          isOpen ? "w-60" : "w-20"
        }`}
      >
        <button
          className="absolute top-6 right-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoMdClose /> : <IoMenu className="w-5 h-5" />}
        </button>

        <div className="flex items-center mt-5 gap-x-4">
          <img src="/icons.png" alt="logo" className="h-10 w-10 rounded-full" />
          {isOpen && <h1 className="text-xl font-bold">ChronicCare</h1>}
        </div>

        {isOpen && <div className="my-4 border-t border-white opacity-60" />}

        <ul className="pt-6 space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={index}
                className={`flex items-center gap-x-4 cursor-pointer p-2 rounded-md transition-all duration-200
                  ${isActive ? "bg-white text-black font-semibold" : "hover:bg-white hover:text-black"}
                `}
                onClick={() => navigate(item.path)}
              >
                {isOpen && <span>{item.label}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
