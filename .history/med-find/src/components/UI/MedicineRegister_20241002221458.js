import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const MedicineRegister = () => {
  const { userid } = useParams();
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/medicine/${userid}`);
        setMedicines(response.data.medicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, [userid]);

  const handleAddMedicineClick = () => {
    navigate('/add-medicine');
  };

  return (
    <div>
      <h2>Medicine Register</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input 
          type="text" 
          placeholder="Search medicines..." 
          className="form-control me-2" 
        />
        <Button onClick={handleAddMedicineClick}>Add Medicine</Button>
      </div>
      <Accordion>
        {medicines.length > 0 ? (
          medicines.map((medicine) => (
            <Accordion.Item eventKey={medicine._id} key={medicine._id}>
              <Accordion.Header>{medicine.medicineName}</Accordion.Header>
              <Accordion.Body>
                <p><strong>Description:</strong> {medicine.description}</p>
                {medicine.image && <img src={`http://localhost:3001/${medicine.image}`} alt={medicine.medicineName} style={{ width: '100px' }} />}
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <p>No medicines found.</p>
        )}
      </Accordion>
    </div>
  );
};

export default MedicineRegister;
