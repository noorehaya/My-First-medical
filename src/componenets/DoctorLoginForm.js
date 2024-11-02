
// DoctorLoginForm.js
import React, { useState } from 'react';


// DoctorLoginForm.js

import { db } from '../firebaseConfig'; // Ensure the path is correct
import { collection, addDoc } from 'firebase/firestore';

export default function DoctorLoginForm({ onSubmit, onClose }) {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [schedule, setSchedule] = useState('');


    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log("Submitting:", { name, specialization, contactInfo, schedule });

        try {
            await addDoc(collection(db, 'doctors'), {
                name,
                specialization,
                contactInfo,
                schedule,
            });
            onSubmit();
             setName('');
            setSpecialization('');
            setContactInfo('');
            setSchedule('');
        } catch (error) {
            console.error("Error adding doctor: ", error);
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
                <h4>Doctor Login</h4>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Specialization</label>
                    <input type="text" className="form-control" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact Information</label>
                    <input type="text" className="form-control" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Schedule</label>
                    <input type="text" className="form-control" value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
