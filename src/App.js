import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import PatientSelect from './components/patients/PatientSelect'
import SignIn from './components/auth/SignIn';
import PatientList from './components/patients/PatientList';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Dashboard}/>
              <Route exact path='/patients/:id' component={PatientSelect}/>
              <Route path='/signin' component={SignIn}/>
              <Route path='/patients' component={PatientList}/>
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
