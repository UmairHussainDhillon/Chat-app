import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import Index from './components/index'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
function App() {
  return (
    <Router>
    <Switch>
    <Route
        path="/home"
        render={(props) => (
          
            <Index/>  
        )}
      />
      <Route
        path="/login"
        render={(props) => (
          
            <Login/>  
        )}
      />
      <Route
        path="/register"
        render={(props) => (
          
            <Register/>  
        )}
      />
      </Switch>
      </Router>

  );
}

export default App;
