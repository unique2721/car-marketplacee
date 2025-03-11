import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaCar, FaUsers, FaMoneyBillWave, FaEnvelope, FaChartBar, FaCogs } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage Cars", path: "/admin/cars", icon: <FaCar /> },
    { name: "Manage Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Transactions", path: "/admin/transactions", icon: <FaMoneyBillWave /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { name: "Support", path: "/admin/support", icon: <FaEnvelope /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5 shadow-lg flex flex-col">
      <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
      <ul className="flex flex-col space-y-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                location.pathname === item.path ? "bg-gray-700 text-white" : "hover:bg-gray-800 hover:text-gray-300"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
