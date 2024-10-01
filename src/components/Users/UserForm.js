import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams(); // Get the user ID from the URL if editing
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // If an ID is present, fetch the user details for editing
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
          setUser(response.data);
          setIsEditing(true); // Set the state to editing mode
        } catch (error) {
          setError('Error fetching user details');
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // PUT request to update the user data
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
        console.log('User updated:', response.data);
      } else {
        // POST request to create a new user
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
        console.log('User created:', response.data);
      }
      navigate('/'); // Redirect to the user list after saving
    } catch (error) {
      setError(isEditing ? 'Error updating user' : 'Error creating user');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit User' : 'Create New User'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Update User' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

