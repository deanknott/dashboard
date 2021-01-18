import React, { Component } from 'react';
import PatientTabs from './PatientTabs';


class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: this.props.patient,
      notes: this.props.patient.notes
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    const patient  = this.state.patient;
    return (
      <div className="container">
        <div className="card z-depth-0 patient-information">
          <span className="card-title" id={patient.id}>
            <p>Name: {patient.first_name} {patient.last_name}</p>
            <p>Age: {patient.age}</p>
            <p>Classification: {patient.classification}</p>
          </span>
          <span className="card-subtitle" id={patient.id}>
            <PatientTabs patient={patient} key={patient.id}/>
          </span>
          <form action={"http://localhost:5000/patients/" + patient.id} method="post">
            <label htmlFor="notes">Notes:</label>
            <textarea type="text" id="notes" style={{height: 150}} name="notes" defaultValue={patient.notes} onChange={this.handleChange}/>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PatientDetails;
