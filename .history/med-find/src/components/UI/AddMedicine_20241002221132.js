// AddMedicine.js
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddMedicine = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3001/medicine", formData); // Replace with your API endpoint
      history.push("/medicine-register"); // Redirect to the register page after submission
    } catch (error) {
      console.error("Error adding medicine", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Medicine</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Medicine Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: "block", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ display: "block", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Medicine Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            style={{ display: "block", margin: "10px 0" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>Submit</button>
      </form>
    </div>
  );
};

export default AddMedicine;
