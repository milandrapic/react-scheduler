import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalTime, getSecondsBetweenTimes } from '../utils/TimeHelper';
import { standardPomoSlice } from '../features/pomodoro/standard-pomodoro-slice';
import { playAudio } from '../utils/AlarmHelper';
import { pomoSettingsSlice } from '../features/pomodoro/pomodoro-settings-overlay';
import PomodoroSettings from '../components/PomodoroSettings/PomodoroSettings';

let initialLoad = true;

const Pomodoro = () => {
  const { timeElapsed, workTime, longBreakTime, shortBreakTime, startTime, timerActive, seconds, chosenAlarm, timerType } = useSelector(state => state.standardPomo);
  const { isActive } = useSelector(state => state.pomoSettingsOverlay);
  const dispatch = useDispatch();

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

  console.log(getSecondsBetweenTimes(new Date(startTime), new Date()));

  const endSession = () => {
    playAudio("alarm", chosenAlarm);
    dispatch(standardPomoSlice.actions.newTimerReset());
  }
  
  useEffect(() => {
    console.log("in useEffect");
    console.log(timeElapsed, seconds, initialLoad)
    if(initialLoad){
        if(timerActive){
            dispatch(standardPomoSlice.actions.updateTimeElapsed());
        }
        initialLoad = false;
    }
    return () => {
        console.log("in Cleanup", initialLoad);
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
  return (
    <div className="page-Pomodoro">

     <button onClick={()=>{
      console.log("hello");
      dispatch(pomoSettingsSlice.actions.toggleOverlay());
      console.log(isActive);
     }}>Settings</button>

     <PomodoroSettings />

     <h4>{timerType==0?"Pomodoro":"Break"}</h4>
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
    </div>
  );
}

export default Pomodoro