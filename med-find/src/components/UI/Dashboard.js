import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get the username from localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []); // Only runs when the component mounts

  return (
    <div className="dashboard-container p-8">
      <h1 className="text-3xl font-bold mb-6">Hey {userName}, here's your dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box for Calendar */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition-all">
          <a href="/calendar">Go to Calendar</a>
        </div>

        {/* Box for AI Chatbot */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition-all">
          <a href="/ai-chatbot">AI Chatbot</a>
        </div>

        {/* Box for Adding Medicines */}
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition-all">
          <a href="/register">Medicine Register</a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
