import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // Filter out the deleted user from the state
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="bg-white hover:bg-gray-100">
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.phone}</td>
              <td className="px-4 py-2 border space-x-2">
                <Link
                  to={`/user/${user.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Details
                </Link>
                <Link
                  to={`/edit-user/${user.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)} // Call delete handler
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;



