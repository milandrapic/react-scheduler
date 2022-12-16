import React from 'react';
// import './Nav.css';
import { Link } from 'react-router-dom';



function Nav() {
const linkHandler = (event) => {
    console.log(event.target.innerText)
};
const tabs_raw = ["to-do", "pomodoro", "schedule"];
const tabs = tabs_raw.map(x => (<Link key={x} to={'/'+x} onClick={linkHandler} ><button className='nav-link'>{x}</button></Link>));
  return (
    <div className='nav-div'>
        {tabs}
    </div>
  )
}

export default Nav