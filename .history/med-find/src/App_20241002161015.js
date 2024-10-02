import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  return (
    <Router>
      <Routes>
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route
          path="*"
          element={
            <>
              <Navbar userName={userName} setUserName={setUserName} />
              <div className="p-4">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard userName={userName} />} />
                  <Route path="/login" element={<Login setUserName={setUserName} />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/calendar" element={<MedCalendar />} />
                  <Route path="/add-medicine" element={<AddMedicine />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
