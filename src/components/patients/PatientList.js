import React, { Component } from 'react';
import PatientSummary from './PatientSummary';
import { Link } from 'react-router-dom';

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      filteredPatients: [],
      query: '',
    }
  }

  getPatients = _ => {
    fetch('http://localhost:5000/patients')
      .then(response => response.json())
      .then(response => {
        const query = this.state.query;
        const filteredPatients = response.data.filter(element => {
          return element.first_name.toLowerCase().includes(query.toLowerCase());
        })
        this.setState({
          patients: response.data,
          filteredPatients
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPatients();
  }

  handleInputChange = (event) => {
    const query = event.target.value;
    this.setState(prevState => {
      const filteredPatients = prevState.patients.filter(element => {
        const patientName = element.first_name + " " + element.last_name;
        return patientName.toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        filteredPatients
      };
    });
  }

  render() {

    const patients = this.state.filteredPatients;
    return(
      <div  className="container">
        <div className="patient-list section">
          {patients.map(patient => {
            return(
              <Link to={'/patients/'+patient.id} key={patient.id}>
                <PatientSummary patient={patient}/>
              </Link>
            )
          })}
          <div className="search form">
            <form>
              <input placeHolder="Search patient: " value={this.state.query} onChange={this.handleInputChange} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default (PatientList);
