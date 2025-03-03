import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, [users]);

  const handleEdit = (user) => {
    setUserToEdit(user);
    setFormVisible(true);
  };

  const handleDelete = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    if (response.ok) {
      setUsers(users.filter((user) => user._id !== userId));
    }
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setUserToEdit(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      {isFormVisible && (
        <UserForm userToEdit={userToEdit} onClose={handleCloseForm} onSuccess={() => fetchUsers()} />
      )}
    </div>
  );
};

export default ManageUsers;
