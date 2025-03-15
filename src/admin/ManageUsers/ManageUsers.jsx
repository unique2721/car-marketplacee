// src/components/ManageUsers.js

import React, { useState, useEffect } from 'react';
import Data from '../../Data/Data';
import Users from "../../Data/mockUsers";
const ManageUsers = () => {
  const [users, setUsers] = useState(Users);
  const [loading, setLoading] = useState(false); // Set loading to false since we're using mock data

  // Handle user deletion
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  // Handle user status update (activate/deactivate)
  const handleUpdate = (userId, updatedData) => {
    setUsers(users.map((user) => (user._id === userId ? { ...user, ...updatedData } : user)));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Manage Users</h2>
      
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin w-10 h-10 border-4 border-t-4 border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400"
                      onClick={() => handleUpdate(user._id, { isActive: !user.isActive })}
                    >
                      Toggle Status
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
