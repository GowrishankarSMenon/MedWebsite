// MedicineRegister.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const MedicineRegister = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const history = useHistory();

  // Fetch medicines data when the component is mounted
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:3001/medicine"); // Replace with your API endpoint
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleAccordion = (index) => {
    setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
  };

  const navigateToAddMedicinePage = () => {
    history.push("/add-medicine");
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Medicine Register</h1>
      
      {/* Search Bar and Add Button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search medicine..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: "10px", width: "80%" }}
        />
        <button onClick={navigateToAddMedicinePage} style={{ marginLeft: "10px", padding: "10px" }}>
          ➕ Add Medicine
        </button>
      </div>

      {/* Accordion List */}
      {filteredMedicines.map((medicine, index) => (
        <div key={index} className="accordion">
          <div className="accordion-title" onClick={() => toggleAccordion(index)}>
            {medicine.title}
          </div>
          {activeAccordionIndex === index && (
            <div className="accordion-content">
              <p>{medicine.description}</p>
              <img src={medicine.imageUrl} alt={medicine.title} style={{ width: "100px" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MedicineRegister;
