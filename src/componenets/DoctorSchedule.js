

// DoctorSchedule.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function DoctorSchedule() {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [slots, setSlots] = useState([]);

    const addSlot = () => {
        setSlots([...slots, { start: startTime, end: endTime }]);
        setStartTime('');
        setEndTime('');
    };

    const saveSchedule = async () => {
        try {
            await addDoc(collection(db, 'schedules'), {
                date,
                slots,
            });
            alert('Schedule saved successfully');
            setDate('');
            setSlots([]);
        } catch (error) {
            console.error("Error saving schedule:", error);
        }
    };
    

    return (
        <div>
            <h2>Doctor Schedule</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <div>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                <button onClick={addSlot}>Add Slot</button>
            </div>
            <button onClick={saveSchedule}>Save Schedule</button>
            
            <h4>Scheduled Slots:</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map((slot, index) => (
                        <tr key={index}>
                            <td>{date}</td>
                            <td>{slot.start}</td>
                            <td>{slot.end}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
