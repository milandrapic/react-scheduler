import React from 'react'
import { useSelector } from 'react-redux';
import './QueuePreview.css';

const QueuePreview = (props) => {
  const { customSessions } = useSelector(state => state.standardPomo);
  const q = props.q;
  const hoverQueue = props.hoverQueue;
  const pageDots = customSessions.map((session, index) => {
    return index === q?<span key={index} style={{fontWeight:"bold", fontSize:"20px"}}>.</span>:<span key={index}>.</span>
  });
  return (
    <div className={hoverQueue?'queuePreview-activeQueue':'pomodoro-inactiveDiv'}>
     <div>
        <p>Topic: {customSessions.length>0?customSessions[q].topic:""}</p>
        <p>Work Time: {customSessions.length>0?customSessions[q].workTime:""}</p>
        <p>Break Time: {customSessions.length>0?customSessions[q].breakTime:""}</p>
        <p>Auto Start Work: {customSessions.length>0?customSessions[q].autoStartWork ? 'Yes' : 'No':""}</p>
        <p>Auto Start Breaks: {customSessions.length>0?customSessions[q].autoStartBreaks ? 'Yes' : 'No':""}</p>
        <span>{pageDots}</span>
    </div>
     </div>
  )
}

export default QueuePreview