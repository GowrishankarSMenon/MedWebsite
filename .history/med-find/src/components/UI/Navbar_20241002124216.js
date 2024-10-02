import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('authToken'); // Assuming auth token is stored in localStorage
  const userName = localStorage.getItem('userName'); // Get the username from localStorage

  // Handle logout
  const handleLogout = () => {
    // Clear the token and any user-related data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName'); // Clear username as well
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">MedicalApp</div>
        <ul className="flex space-x-6 text-lg">
          <li><Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link></li>
          <li><Link to="/features" className="hover:text-gray-200">Features</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        </ul>
        <div className="flex items-center">
          {/* Conditionally render Login/Signup or Logout */}
          {isLoggedIn ? (
            <>
              <span className="mr-4">Hey, {userName}</span> {/* Display the username */}
              <button 
                onClick={handleLogout} 
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 mr-2">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
