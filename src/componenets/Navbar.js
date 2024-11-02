import React, { useState } from 'react';
import DoctorLoginForm from './DoctorLoginForm';
import PatientLoginForm from './PatientLoginForm';

export default function Navbar() {
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handleDoctorLogin = () => {
    if (isDoctorLoggedIn) {
      setIsDoctorLoggedIn(false);
    } else {
      setShowDoctorForm(true);
    }
  };

  const handlePatientLogin = () => {
    if (isPatientLoggedIn) {
      setIsPatientLoggedIn(false);
    } else {
      setShowPatientForm(true);
    }
  };

  const handleDoctorFormSubmit = () => {
    setIsDoctorLoggedIn(true);
    setShowDoctorForm(false);
  };

  const handlePatientFormSubmit = () => {
    setIsPatientLoggedIn(true);
    setShowPatientForm(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Health Care</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
            <div>
              {isDoctorLoggedIn ? (
                <button type="button" className="btn btn-danger mx-2" onClick={handleDoctorLogin}>Logout</button>
              ) : (
                <button type="button" className="btn btn-success mx-2" onClick={handleDoctorLogin}>Doctor Login</button>
              )}
              {isPatientLoggedIn ? (
                <button type="button" className="btn btn-danger mx-2" onClick={handlePatientLogin}>Logout</button>
              ) : (
                <button type="button" className="btn btn-success mx-2" onClick={handlePatientLogin}>Patient Login</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render Forms Conditionally */}
      {showDoctorForm && (
        <DoctorLoginForm onSubmit={handleDoctorFormSubmit} onClose={() => setShowDoctorForm(false)} />
      )}
      {showPatientForm && (
        <PatientLoginForm onSubmit={handlePatientFormSubmit} onClose={() => setShowPatientForm(false)} />
      )}
    </div>
  );
}
