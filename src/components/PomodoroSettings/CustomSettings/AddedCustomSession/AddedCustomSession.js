import React, { useState } from 'react'

const spanStyle = {
    border: '2px solid black',
    width: '50px',
    margin: '2px',
    padding: '1px',
    fontSize: '12px',
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: 'rgb(250,150,150)',
    fontFamily: 'monospace'
  }
const previewStyle = {
    position: 'fixed',
    float: 'top',
    top: '1%',
    right: '1%',
    zIndex: '150',
    overflow: 'hidden',
    border: '2px solid black',
    textAlign: 'center',
    position: 'fixed',
    padding: '10px 10px 10px',
    width: '200px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    backgroundColor: 'rgb(250,150,150)',
    borderRadius: '50px',
    display: 'block',
    fontFamily: 'monospace',
    fontSize: '13px',
}
const hideStyle = {
    visibility: 'collapse',
    display: 'none'
}
const deleteButtonStyle = {
        backgroundImage: 'url(trash.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        border: 'none',
        padding: '7px 7px 7px 7px',
        textAlign: 'center',
        display: 'inline-block',
        margin: '4px 4px',
        backgroundColor: 'rgb(250,150,150)',
        width: '10px',
        borderRadius: '100px'
}

const editButtonStyle = {
    backgroundImage: 'url(edit.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: 'none',
    padding: '10px 10px 10px 10px',
    textAlign: 'center',
    display: 'inline-block',
    margin: '1px 1px',
    backgroundColor: 'rgb(250,150,150)',
    width: '10px',
    borderRadius: '100px'
}


const AddedCustomSession = (props) => {
  const {index, session, deleteSession} = props;
  const {workTime, breakTime, topic, autoStartWork, autoStartBreaks} = session;
  const [hover, setHover] = useState(false);

  
  return (
    <div style={{display: 'inline-block',}}>
    <div style={spanStyle} onMouseOver={()=>{setHover(true);}} onMouseOut={()=>{setHover(false);}}>
        <p style={{display:'inline'}}>{index + 1}</p><br></br>
        <button onClick={(event) => {
            event.preventDefault();
            deleteSession(index);
            }} style={deleteButtonStyle}></button>
        <button style={editButtonStyle}></button>
    </div>
    
    <div style={hover ? previewStyle : hideStyle}>
            <p>Topic: {topic}</p>
            <p>Work Time: {workTime}</p>
            <p>Break Time: {breakTime}</p>
            <p>Auto Start Work: {autoStartWork ? 'Yes' : 'No'}</p>
            <p>Auto Start Breaks: {autoStartBreaks ? 'Yes' : 'No'}</p>
    </div>
    </div>
  )
}

export default AddedCustomSession