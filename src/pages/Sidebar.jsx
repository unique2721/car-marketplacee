import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaCar, FaUsers, FaEnvelope, FaChartBar, FaCogs } from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage Cars", path: "/admin/cars", icon: <FaCar /> },
    { name: "Manage Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCogs /> },
    { name: "Logout", path: "/logout", icon: <FiLogOut /> },
  ];

  return (
    <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300 p-4 relative flex flex-col`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-5 bg-gray-800 p-2 rounded-full hover:bg-gray-700"
      >
        <FiMenu />
      </button>

      {/* Sidebar Title */}
      <h2 className={`text-xl font-bold text-center mb-6 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
        Admin Panel
      </h2>

      {/* Sidebar Menu */}
      <ul className="space-y-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span className={`${isOpen ? "block" : "hidden"} transition-all duration-300`}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
