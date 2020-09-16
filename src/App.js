import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import RemoteObd from './RemoteObd';
import RegistObd from './RegistObd';
import DecideVehicle from './Routes/DecideVehicle';
import NotFound from './Routes/NotFound';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/home' component={Home} />
        <Route exact path='/remote-obd' component={RemoteObd} />
        <Route exact path='/regist-obd' component={RegistObd} />
        <Route exact path='/decide/:bookingPid' component={DecideVehicle} />
        <Route exact path='/not-found' component={NotFound} />
      </Fragment>
    </Router>
  );
}

export default App;
