import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const AddMedicine = () => {
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const userId = "your-user-id"; // Replace with actual user ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('medicineName', medicineName);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`http://localhost:3001/medicine/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/register'); // Use navigate for redirection
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Medicine</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Medicine Name</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
