import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Retrieve and decode token to get userId
  const token = localStorage.getItem("token");
  let userId;

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  } else {
    console.error("No token found. User not authenticated.");
  }

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/medicine/${userId}`);
        setMedicines(response.data.medicines);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, [userId]); // Add userId as a dependency to re-fetch if it changes

  const handleAddMedicine = () => {
    navigate('/add-medicine'); // Navigate to AddMedicine page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Your Medicines</h1>
      <button
        onClick={handleAddMedicine}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
      >
        Add Medicine
      </button>
      <input
        type="text"
        className="mb-4 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {medicines
        .filter(medicine => 
          medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((medicine) => (
          <div key={medicine._id} className="border rounded-md mb-4 p-4 bg-gray-50 hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold">{medicine.medicineName}</h2>
            <p className="text-gray-700">{medicine.description}</p>
            {medicine.image && (
              <img 
                src={`http://localhost:3001/${medicine.image}`} 
                alt={medicine.medicineName} 
                className="w-full h-auto mt-2 rounded-md"
              />
            )}
          </div>
      ))}
    </div>
  );
};

export default Register;
