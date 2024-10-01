import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user details');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  
  if (loading) return <p className="text-center">Loading user details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto my-8 px-4">
      {user ? (
        <div className="bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="mb-2">
            <strong>Website:</strong> {user.website}
          </p>
          <p className="mb-4">
            <strong>Company:</strong> {user.company.name}
          </p>
          <div className="flex justify-end space-x-2">
            {/* <Link
              to={`/edit-user/${user.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit User
            </Link>
            <Link
              to={`/delete-user/${user.id}`}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Delete User
            </Link> */}
            <Link
              to="/"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Back to User List
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-600">User not found</p>
      )}
    </div>
  );
};

export default UserPage;
