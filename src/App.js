import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RemoteObd from './RemoteObd';
import RegistObd from './RegistObd';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/remote-obd' component={RemoteObd} />
        <Route exact path='/regist-obd' component={RegistObd} />
      </Fragment>
    </Router>
  );
}

export default App;
