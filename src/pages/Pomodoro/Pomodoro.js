import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalTime, getSecondsBetweenTimes } from '../../utils/TimeHelper';
import { standardPomoSlice } from '../../features/pomodoro/standard-pomodoro-slice';
import { playAudio } from '../../utils/AlarmHelper';
import { pomoSettingsSlice } from '../../features/pomodoro/pomodoro-settings-overlay';
import PomodoroSettings from '../../components/PomodoroSettings/PomodoroSettings';
import PastSession from '../../components/PastSession/PastSession';
import './Pomodoro.css';
import AddedCustomSession from '../../components/PomodoroSettings/CustomSettings/AddedCustomSession/AddedCustomSession';

let initialLoad = true;

const Pomodoro = () => {
  const { timeElapsed, topic, startTime, timerActive, seconds, chosenAlarm, timerType, sessions, customSessions } = useSelector(state => state.standardPomo);
  const { isActive } = useSelector(state => state.pomoSettingsOverlay);
  const dispatch = useDispatch();
  const [hoverQueue, setHoverQueue] = useState(false);
  const [scrollQueue, setScrollQueue] = useState(0);

//   const getSessionDuration = (typeOfTimer) => {
//     switch(typeOfTimer){
//         case 0:
//             return workTime;
//         case 1:
//             return shortBreakTime;
//         case 2:
//             return longBreakTime;
//     }
//   }

  // console.log(getSecondsBetweenTimes(new Date(startTime), new Date()));

  const endSession = () => {
    playAudio("alarm", chosenAlarm);
    dispatch(standardPomoSlice.actions.newTimerReset());
  }
  
  useEffect(() => {
    // console.log("in useEffect");
    // console.log(timeElapsed, seconds, initialLoad)
    if(initialLoad){
        if(timerActive){
            dispatch(standardPomoSlice.actions.updateTimeElapsed());
        }
        initialLoad = false;
    }
    return () => {
        // console.log("in Cleanup", initialLoad);
        initialLoad = true;
    };
  }, [initialLoad, dispatch, seconds, timeElapsed, timerActive]);

  useEffect(() => {
    const timer = setInterval(() => {
      if(timerActive){
      const passed = Math.floor((getLocalTime() - new Date(startTime)) / 1000);
    //   console.log(passed)
        if (seconds <= 0) {
            // sound alarm
            endSession();
        }
        else if (passed !== timeElapsed){
          dispatch(standardPomoSlice.actions.secondPassed({secondsPassed: passed}));
        }
        
      }
    }, 200)

    return () => {
      clearInterval(timer);
    }
  }, [timeElapsed, dispatch, timerActive, startTime, seconds])



  const minutes = Math.floor(seconds/60);
  const s = seconds % 60;
  const sessionTitle = {
    0: "Pomodoro",
    1: "Short Break",
    2: "Long Break",
    3: "Pomodoro",
    4: "Break"
  };
  const pastSessions = sessions.map(session => <PastSession key={session.sid} session={session} />);
  const queueScroller = (event) => {
    setScrollQueue(scrollQueue => scrollQueue + 1);
  }
  const q = customSessions.length>0?scrollQueue%customSessions.length:0;
  const pageDots = customSessions.map((session, index) => {
    return index === q?<span key={index} style={{fontWeight:"bold", fontSize:"20px"}}>.</span>:<span key={index}>.</span>
  });

  return (
    <div className="page-Pomodoro">

     <button onClick={()=>{
      dispatch(pomoSettingsSlice.actions.toggleOverlay());
     }}>Settings</button>

     <div className={customSessions.length > 0?'pomodoro-queue':'pomodoro-inactiveDiv'} onMouseOver={() => {
        console.log("in")
        if(customSessions.length > 0){
          setHoverQueue(true);
        }
     }} onMouseOut={() => setHoverQueue(false)}
     onClick={() => queueScroller()}
     >
      <label >Queue:</label> <p style={{display: 'inline'}}>{customSessions.length}</p>
     </div>
     <div className={hoverQueue?'pomodoro-activeQueue':'pomodoro-inactiveDiv'}>
     <div>
            <p>Topic: {customSessions.length>0?customSessions[q].topic:""}</p>
            <p>Work Time: {customSessions.length>0?customSessions[q].workTime:""}</p>
            <p>Break Time: {customSessions.length>0?customSessions[q].breakTime:""}</p>
            <p>Auto Start Work: {customSessions.length>0?customSessions[q].autoStartWork ? 'Yes' : 'No':""}</p>
            <p>Auto Start Breaks: {customSessions.length>0?customSessions[q].autoStartBreaks ? 'Yes' : 'No':""}</p>
            <span>{pageDots}</span>
    </div>
     </div>

     <PomodoroSettings />

     <h4>{sessionTitle[timerType]}</h4>
     <h2>{minutes}:{s<10?'0':''}{s}</h2>
     <button onClick={() => {
        if (!timerActive){
            playAudio("start");
            dispatch(standardPomoSlice.actions.shiftTimes());
        }
        else{
            playAudio("pause")
        }
        dispatch(standardPomoSlice.actions.setTimerActive({timerActive: !timerActive}))
        
      }
     }>{timerActive?"Stop":"Start"}</button>
     <button onClick={ () => {
        playAudio("clear");
        dispatch(standardPomoSlice.actions.resetTimer());
     }} >Reset</button>
     <button onClick={
        () => {
            endSession();
        }
     }>Skip</button>
     {topic!=''?<div><h4 style={{ textDecoration: 'underline' }}>Topic</h4><label>{topic}</label></div>:null}
    <hr></hr>
    {pastSessions}
    </div>
  );
}

export default Pomodoro