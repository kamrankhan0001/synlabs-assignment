import React from 'react';
import UserList from '../components/Users/UserList';
import { Link } from 'react-router-dom';


const HomePage = () => {
 
  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">User Management Application</h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/create-user"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create User
        </Link>
      </div>
      <UserList />
      
     
    </div>
  );
};

export default HomePage;



