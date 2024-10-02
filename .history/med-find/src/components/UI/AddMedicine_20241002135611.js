import React, { useState } from 'react';

function AddMedicine() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the form data
    console.log({ title, description, image });
    
    // You can later replace this part to make an API call
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
