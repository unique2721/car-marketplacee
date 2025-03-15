// src/pages/admin/Settings.jsx
import React, { useState } from "react";
import Layout from '../ManageCars/Layout.jsx'

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Add code to update theme in localStorage or context if needed
  };

  const handleNotificationsChange = (e) => {
    setNotifications(e.target.checked);
    // Add code to save notifications preference
  };

  return (
    <Layout>
    <div className="flex flex-col">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Theme Settings</h3>
          <div className="mt-4">
            <label htmlFor="theme" className="mr-4">Choose Theme:</label>
            <select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
              className="px-3 py-2 border border-gray-300 rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold">Notification Settings</h3>
          <div className="mt-4">
            <label htmlFor="notifications" className="mr-4">Enable Notifications:</label>
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={handleNotificationsChange}
              className="form-checkbox"
            />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Settings;
