import React, { useState } from 'react'

const AddedCustomSession = (props) => {
  const {index, session} = props;
  const {workTime, breakTime, topic, autoStartWork, autoStartBreaks} = session;
  const [hover, setHover] = useState(false);
  const spanStyle = {
    border: '2px solid black',
    width: '3%',
    margin: '2px',
    padding: '1px',
    fontSize: '12px',
  }
  return (
    <span style={spanStyle} onMouseOver={()=>{
        console.log("in", index);
        setHover(true);
    }} onMouseOut={()=>{
        console.log("out", index)
        setHover(false);
    }}
    >
        <p style={{display:'inline'}}>{props.index}</p>
    </span>
  )
}

export default AddedCustomSession