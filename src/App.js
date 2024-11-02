
import './App.css';
import DoctorSchedule from './componenets/DoctorSchedule';

import Navbar from './componenets/Navbar';
import PatientBooking from './componenets/PatientBooking.js';

function App() {
  return (
    <>
    <Navbar/>
    <PatientBooking/>
    <DoctorSchedule/>
    </>
  );
}

export default App;
