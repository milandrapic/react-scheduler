import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Pomodoro from './pages/Pomodoro/Pomodoro';



function App() {

  return (
    <div className="App">
    <div className='App-header'>
     <h1>Pomodoro</h1>
    </div>
     <Route path={"/"}>
      <Pomodoro />
     </Route>
     
    </div>
  );
}

export default App;
