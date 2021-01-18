import React, { Component } from 'react';
import PatientDetails from './PatientDetails';

class PatientSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }
  }

  componentDidMount() {
    this.getPatients();
  }

  getPatients = _ => {
    fetch('http://localhost:5000/patients')
      .then(response => response.json())
      .then(response => this.setState({ patients: response.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { patients } = this.state;
    const id = this.props.match.params.id;
    return (
      <div className="container">
        <div className="card z-depth-0 patient-details">
          {patients.map(patient => {
            if(parseInt(id) === parseInt(patient.id)) {
              return(
                <PatientDetails patient={patient} key={patient.id}/>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

export default PatientSelect;
