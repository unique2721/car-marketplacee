// src/pages/admin/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { logout } from '../../utils/auth'; // Add your logout function here

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call your logout logic here (e.g., clearing tokens, etc.)
    logout();  // Implement this function to handle logout (localStorage.clear(), etc.)
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md mt-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Are you sure you want to log out?</h2>
          <p className="text-lg text-gray-600 mt-4">You will be redirected to the login page.</p>

          <div className="mt-6 space-x-4">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Log Out
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
