import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Pomodoro from './pages/Pomodoro/Pomodoro';



function App() {

  return (
    <div className="App">
     <h1>Scheduler</h1>
     <Nav />
     <hr></hr>
     <Route path={"/pomodoro"} exact>
      <Pomodoro />
     </Route>
     
    </div>
  );
}

export default App;
