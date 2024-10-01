import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  return <div className="text-center">User Detail Page for User ID: {id}</div>;
};

export default UserDetail;
