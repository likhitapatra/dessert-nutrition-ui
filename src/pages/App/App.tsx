import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import './App.css';
import AddData from '../AddData/AddData';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/add" component={AddData} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
