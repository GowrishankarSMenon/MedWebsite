// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import MedCalendar from './components/UI/MedCalendar';
import Dashboard from './components/UI/Dashboard';
import AIChatbot from './components/UI/AIChatbot';
import AddMedicine from './components/UI/AddMedicine';
import Login from './components/UI/Login';
import Signup from './components/UI/SignUp';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import { AuthContext } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthContext.Consumer>
        {({ user }) => (
          <>
            {user && <Navbar />} {/* Show Navbar only if user is logged in */}
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/dashboard" />}
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <PrivateRoute>
                    <MedCalendar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ai-chatbot"
                element={
                  <PrivateRoute>
                    <AIChatbot />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-medicine"
                element={
                  <PrivateRoute>
                    <AddMedicine />
                  </PrivateRoute>
                }
              />

              {/* Redirect all other routes to dashboard or login based on authentication */}
              <Route
                path="*"
                element={
                  user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </>
        )}
      </AuthContext.Consumer>
    </Router>
  );
}

export default App;
