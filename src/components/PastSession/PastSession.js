import React from 'react'
import { useSelector } from 'react-redux';
import './PastSession.css';

const PastSession = (props) => {
  const sNum = props.sNum;
  const hoverSession = props.hoverSession;
  const { sessions } = useSelector(state => state.standardPomo);
  const pageDots = sessions.map((session, index) => {
    return index === sNum?<span key={index} style={{fontWeight:"bold", fontSize:"20px"}}>.</span>:<span key={index}>.</span>
  });
  return (
    <div className={hoverSession?'sessionPreview-sessionHover':'pomodoro-inactiveDiv'}>
        <div><label>Session ID</label><p>{sessions.length>0?sessions[sNum].sid:""}</p></div>
        <div><label>Time Worked</label><p>{sessions.length>0?sessions[sNum].timeWorked:""}</p></div>
        <div><label>Expected Session Length</label><p>{sessions.length>0?sessions[sNum].targetTimeWorked:""}</p></div>
        <div><label>Topic</label><p>{(sessions.length && sessions[sNum].topic !== "")>0?sessions[sNum].topic:"N/A"}</p></div>
        {pageDots}
    </div>
  )
}

export default PastSession