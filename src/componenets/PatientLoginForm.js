import React, { useState } from 'react';
// import { db } from '../firebaseConfig';

// import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';


export default function PatientLoginForm({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'patients'), {
        name,
        contactDetails,
        medicalHistory,
      });
      onSubmit();
    } catch (error) {
      console.error("Error adding patient: ", error);
    }
  };

  return (
    <div className="position-relative bg-light p-4 my-3 rounded shadow">
      <button
        type="button"
        onClick={onClose}
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close"
      ></button>
      <form onSubmit={handleSubmit}>
        <h4>Patient Login</h4>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Details</label>
          <input type="text" className="form-control" value={contactDetails} onChange={(e) => setContactDetails(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Medical History</label>
          <input type="text" className="form-control" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}