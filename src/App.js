import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path='/' component={Home} />
      </Fragment>
    </Router>
  );
}

export default App;
