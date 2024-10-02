import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [medicines, setMedicines] = useState([]);
  // Retrieve and decode token to get userId
  const token = localStorage.getItem("token");
  let userId;

  if (token) {
    const decodedToken = jwtDecode(token); // Use the correct function
    userId = decodedToken.userId; // Make sure this matches how the user ID is stored in the token
  } else {
    console.error("No token found. User not authenticated.");
    // Optionally handle the absence of token (redirect or show a message)
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
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Medicines</h1>
      <input
        type="text"
        className="mb-4 block w-full border-gray-300 rounded-md shadow-sm"
        placeholder="Search..."
      />
      {medicines.map((medicine) => (
        <div key={medicine._id} className="border rounded-md mb-2 p-2">
          <h2 className="font-bold">{medicine.medicineName}</h2>
          <p>{medicine.description}</p>
          {medicine.image && (
            <img src={`http://localhost:3001/${medicine.image}`} alt={medicine.medicineName} className="w-full h-auto" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Register;
