import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RemoteObd from './RemoteObd';
import RegistObd from './RegistObd';
import DecideVehicle from './DecideVehicle';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/remote-obd' component={RemoteObd} />
        <Route exact path='/regist-obd' component={RegistObd} />
        <Route exact path='/decide/:bookingPid' component={DecideVehicle} />
      </Fragment>
    </Router>
  );
}

export default App;
