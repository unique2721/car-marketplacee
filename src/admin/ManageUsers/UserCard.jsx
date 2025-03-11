import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 w-64">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">Role: {user.role}</p>
        <p className="text-sm text-gray-500">Status: {user.status}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          View Details
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
