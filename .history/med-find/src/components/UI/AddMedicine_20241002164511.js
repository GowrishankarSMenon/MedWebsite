import React, { useState } from 'react';

const AddMedicine = () => {
  // State variables for form data
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // For storing the selected image file
  const yourUserId = 'yourUserIdHere'; // Replace with actual user ID or retrieve dynamically

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('medicineName', medicineName);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file to the form data
    }

    try {
      const response = await fetch(`http://localhost:3001/medicine/${yourUserId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Medicine Name:</label>
        <input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])} // Update state with the selected file
        />
      </div>

      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default AddMedicine;
