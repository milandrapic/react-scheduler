import React from 'react'
import { useSelector } from 'react-redux';
import { formatMinutesAndSeconds, getMinutesAndSecondsFromSeconds } from '../../utils/TimeHelper';
import './PastSession.css';

const PastSession = (props) => {
  const sNum = props.sNum;
  const hoverSession = props.hoverSession;
  const { sessions } = useSelector(state => state.standardPomo);
  const pageDots = sessions.map((session, index) => {
    return index === sNum?<span key={index} style={{fontWeight:"bold", fontSize:"20px"}}>.</span>:<span key={index}>.</span>
  });

  const { minutes, seconds } = getMinutesAndSecondsFromSeconds(sessions.length>0?sessions[sNum].timeWorked:0);
  const timeWorked = formatMinutesAndSeconds(minutes, seconds);

  const { minutes: targetMinutes, seconds: targetSeconds } = getMinutesAndSecondsFromSeconds(sessions.length>0?sessions[sNum].targetTimeWorked:0);
  const targetTimeWorked = formatMinutesAndSeconds(targetMinutes, targetSeconds);

  return (
    <div className={hoverSession?'sessionPreview-sessionHover':'pomodoro-inactiveDiv'}>
        <p>Session Number: {sessions.length>0?sessions[sNum].sid + 1:""}</p>
        <p>Time Worked: {timeWorked}</p>
        <p>Session Length: {targetTimeWorked}</p>
        <p>Topic: {(sessions.length && sessions[sNum].topic !== "")>0?sessions[sNum].topic:"N/A"}</p>
        {pageDots}
    </div>
  )
}

export default PastSession