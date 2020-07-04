import React from 'react';

function App() {
  return (
    <div>
      <h3>.env test</h3>
      <h5>ENV_TEST: {process.env.ENV_TEST}</h5>
      <h5>REACT_APP_ENV_TEST: {process.env.REACT_APP_ENV_TEST}</h5>
      <h5>NODE_ENV: {process.env.NODE_ENV}</h5>
    </div>
  );
}

export default App;
