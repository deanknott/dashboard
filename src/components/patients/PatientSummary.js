import React from 'react';

const PatientSummary = ({ patient }) => {
  return (
    <div className="container">
      <div className="card z-depth-0 patient-summary">
        <span className="card-title" id={patient.id}>{patient.first_name} {patient.last_name}: {patient.age}</span>
      </div>
    </div>
  );
}

export default PatientSummary;
