import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import MedCalendar from './components/UI/MedCalendar';
import Dashboard from './components/UI/Dashboard';
import AIChatbot from './components/UI/AIChatbot';
import AddMedicine from './components/UI/AddMedicine';
import Login from './components/UI/Login';
import Signup from './components/UI/SignUp';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function App() {
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName') || '');
    }
  }, []);

  // Handle login (set username and token)
  const handleLogin = (userName) => {
    setUserName(userName);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'sampleToken');
    localStorage.setItem('userName', userName);
  };


  return (
    <Router>
      {isAuthenticated && <Navbar userName={userName} setUserName={setUserName} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setUserName={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard userName={userName} />} />} />
        <Route path="/calendar" element={<ProtectedRoute element={<MedCalendar />} />} />
        <Route path="/add-medicine" element={<ProtectedRoute element={<AddMedicine />} />} />
        <Route path="/ai-chatbot" element={<ProtectedRoute element={<AIChatbot />} />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
