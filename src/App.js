
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import UserForm from './components/Users/UserForm'; // for Create/Edit User form

function App() {
  
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/create-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;


