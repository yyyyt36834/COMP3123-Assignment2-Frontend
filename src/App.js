import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Screens/Login'; 
import Dashboard from './Screens/Dashboard';  
import SignUp from './Screens/SignUp';  
import './Styles/style.css';
//import { SessionProvider } from './Contexts/Context';


function App() {

  return (
    //<SessionProvider>
    <div className="centered-container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
//</SessionProvider>
  );
}

export default App;



