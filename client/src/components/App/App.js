import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from '../HomePage'
import PageNotFound from '../PageNotFound'
import LoginPage from '../LoginPage'

function App() {
  return (
    <div className="fullscreen-container">
    {/* <Header /> */}
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/chat" component={HomePage} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
  );
}

export default App;