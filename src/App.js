import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import Index from './components/index'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Dasshboard from './components/dasshboard';
function App() {
  return (
    <Router>
    <Switch>
    <Route
        path="/home" exact
        render={(props) => (
          
            <Index/>  
        )}
      />
       <Route
        path="/dashboard"
        render={(props) => (
            <Dasshboard {...props}/>  
        )}
      />
      
      <Route
        path="/login"
        render={(props) => (
          
            <Login {...props}
            />  
        )}
      />
      <Route
        path="/register"
        render={(props) => (
          
            <Register {...props}/>  
        )}
      />
      </Switch>
      </Router>

  );
}

export default App;
