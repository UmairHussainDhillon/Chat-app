import React from 'react';
import Login from './components/Login'
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
        path="/"
        render={(props) => (
          
            <Login/>  
        )}
      />
      </Switch>
      </Router>

  );
}

export default App;
