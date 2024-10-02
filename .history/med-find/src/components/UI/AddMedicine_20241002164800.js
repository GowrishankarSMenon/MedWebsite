import React, { useState } from 'react';

const AddMedicine = () => {
  // State variables for form data
  const [medicineName, setMedicineName] = useState(''); // Added state for medicineName
  const [description, setDescription] = useState(''); // Added state for description
  const [imageFile, setImageFile] = useState(null); // Added state for image file
  const yourUserId = 'yourUserIdHere'; // Replace with actual user ID or fetch dynamically

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('medicineName', medicineName); // Append medicine name to the form data
    formData.append('description', description); // Append description to the form data
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file to the form data
    }

    try {
      const response = await fetch(`http://localhost:3001/medicine/${yourUserId}`, {
        method: 'POST',
        body: formData, // Send form data with the POST request
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const result = await response.json();
      console.log(result); // Log the response from the server
    } catch (error) {
      console.error('Error:', error); // Log any errors during the request
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Medicine Name:</label>
        <input
          type="text"
          value={medicineName} // Set the value to state
          onChange={(e) => setMedicineName(e.target.value)} // Update the state on change
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description} // Set the value to state
          onChange={(e) => setDescription(e.target.value)} // Update the state on change
          required
        />
      </div>

      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])} // Update the image file state when selected
        />
      </div>

      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default AddMedicine;
