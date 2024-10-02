import React, { useState } from 'react';

const token = localStorage.getItem("token");
// Decode the token to get userId
const decodedToken = jwt_decode(token);
const userId = decodedToken.userId; // Make sure this matches how the user ID is stored in the token

function AddMedicine() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('medicineName', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch(`http://localhost:3001/medicine/${userId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Medicine added:', data);
        // Handle success, e.g., clear form or display a success message
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-medicine-container p-8">
      <h1 className="text-3xl font-bold mb-6">Add Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Medicine Title */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="title">Medicine Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter medicine title"
            required
          />
        </div>

        {/* Medicine Description */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter medicine description"
            rows="4"
            required
          />
        </div>

        {/* Medicine Image */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMedicine;
