import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b text-left text-sm text-gray-600">Name</th>
            <th className="py-3 px-6 border-b text-left text-sm text-gray-600">Email</th>
            <th className="py-3 px-6 border-b text-left text-sm text-gray-600">Role</th>
            <th className="py-3 px-6 border-b text-left text-sm text-gray-600">Status</th>
            <th className="py-3 px-6 border-b text-left text-sm text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-3 px-6 border-b">{user.name}</td>
              <td className="py-3 px-6 border-b">{user.email}</td>
              <td className="py-3 px-6 border-b">{user.role}</td>
              <td className="py-3 px-6 border-b">{user.status}</td>
              <td className="py-3 px-6 border-b">
                <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(user._id)} className="ml-4 text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
