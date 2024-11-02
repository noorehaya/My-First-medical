import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function PatientBooking() {
    const [schedules, setSchedules] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointments, setAppointments] = useState([]); // State to store appointments

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'schedules'));
                const scheduleData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSchedules(scheduleData);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };

        const fetchAppointments = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'appointments'));
                const appointmentData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAppointments(appointmentData);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchSchedules();
        fetchAppointments();
    }, []);

    const bookAppointment = async () => {
        if (selectedSlot) {
            try {
                const docRef = await addDoc(collection(db, 'appointments'), {
                    scheduleId: selectedSlot.scheduleId,
                    date: selectedSlot.date,
                    time: selectedSlot.time,
                });
                alert('Appointment booked successfully');
                setAppointments([...appointments, { id: docRef.id, ...selectedSlot }]);
                setSelectedSlot(null);
            } catch (error) {
                console.error("Error booking appointment:", error);
            }
        } else {
            alert('Please select a slot first.');
        }
    };

    const deleteAppointment = async (appointmentId) => {
        try {
            await deleteDoc(doc(db, 'appointments', appointmentId));
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            alert('Appointment deleted successfully');
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Available Schedules</h2>
            {schedules.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) =>
                            schedule.slots.map((slot, index) => (
                                <tr key={`${schedule.id}-${index}`}>
                                    <td>{schedule.date}</td>
                                    <td>{slot.start}</td>
                                    <td>{slot.end}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setSelectedSlot({
                                                scheduleId: schedule.id,
                                                date: schedule.date,
                                                time: `${slot.start} - ${slot.end}`,
                                            })}
                                        >
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            ) : (
                <p>No available schedules at the moment.</p>
            )}

            {selectedSlot && (
                <div className="mt-4">
                    <h3>Confirm Appointment</h3>
                    <p>Date: {selectedSlot.date}</p>
                    <p>Time: {selectedSlot.time}</p>
                    <button className="btn btn-success" onClick={bookAppointment}>Confirm Booking</button>
                </div>
            )}

            <h2 className="mt-5">Your Appointments</h2>
            {appointments.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No booked appointments yet.</p>
            )}
        </div>
    );
}
