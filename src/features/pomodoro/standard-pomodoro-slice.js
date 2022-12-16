import { createSlice } from '@reduxjs/toolkit';
import { getLocalTime, getLocalTimeAfterSeconds, getSecondsBetweenTimes } from '../../utils/TimeHelper';

const workTime = 0.1;
const initialTimerState = {
    startTime: getLocalTime().toString(),
    workTime: workTime,
    shortBreakTime: 5,
    longBreakTime: 10,
    sessionsUntilLongBreak: 3,
    numberOfWorkSessions: 0,
    // timers: {
    //     workTime: workTime,
    //     shortBreakTime: 5,
    //     longBreakTime: 10
    // },
    // sessionType: "workTime",
    duration: workTime*60,
    autoStartBreaks: true,
    autoStartWork: true,
    topic: '',
    seconds: workTime*60,
    timeElapsed: 0,
    timerActive: false,
    chosenAlarm: 0,
    timerType: 0,
    sid: 0,
    sessions: []
}



export const standardPomoSlice = createSlice({
    name: 'standardPomo',
    initialState: initialTimerState,
    reducers: {
        setTimer: (state, action) => {
            return action.payload
        },
        secondPassed: (state) => {
            state.timeElapsed += 1;
            state.seconds -= 1
        },
        setTimerActive: (state, action) => {
            state.timerActive = action.payload.timerActive
        },
        setStartTime: (state, action) => {
            state.startTime = action.payload.startTime.toString()
        },
        shiftTimes: (state) => {
            const start = getLocalTimeAfterSeconds(-state.timeElapsed);
            state.startTime = start.toString();
        },
        resetTimer: (state) => {
            state.timerActive = false;
            state.seconds = state.duration;
            state.timeElapsed = 0;
        },
        updateTimeElapsed: (state) => {
            const secsBetween = getSecondsBetweenTimes(new Date(state.startTime), getLocalTime());
            console.log(secsBetween);
            state.timeElapsed = secsBetween;
            state.seconds = state.duration - secsBetween;
        },
        newTimerReset: (state) => {
            if(state.timerType == 0){
                state.numberOfWorkSessions += 1;
            }
            const getNewTypeOfTimer = () => {
                if(state.timerType == 0){
                    if((state.numberOfWorkSessions % state.sessionsUntilLongBreak) == 0){
                        return 2;
                    }
                    else return 1;
                }
                else return 0;
            }
            const newTypeOfTimer = getNewTypeOfTimer();

            state.timerType = newTypeOfTimer
            switch(newTypeOfTimer){
                case 0:
                    state.duration = state.workTime * 60;
                    state.seconds = state.workTime * 60;
                    state.timerActive = state.autoStartWork;
                    break;
                case 1:
                    state.duration = state.shortBreakTime * 60;
                    state.seconds = state.shortBreakTime * 60;
                    state.timerActive = state.autoStartBreaks;
                    break;
                case 2:
                    state.duration = state.longBreakTime * 60;
                    state.seconds = state.longBreakTime * 60;
                    state.timerActive = state.autoStartBreaks;
                    break;

            }
            
            state.timeElapsed = 0;
            state.startTime = getLocalTime().toString();
    
        },
        setChosenAlarm: (state, action) => {
            state.chosenAlarm = action.payload.chosenAlarm
        },
        setSessionsUntilLongBreak: (state, action) => {
            state.sessionsUntilLongBreak = action.payload.sessionsUntilLongBreak
        },
        submitDefaultSettings: (state, action) => {
            const d = action.payload.workTime * 60;
            const secs = d - state.timeElapsed;
            console.log(action)
            console.log(secs, "secs", action.payload.workTime, "workTime");
            state.duration = d;
            state.seconds = secs;
            state.workTime = action.payload.workTime;
            state.shortBreakTime = action.payload.shortBreakTime;
            state.longBreakTime = action.payload.longBreakTime;
            state.sessionsUntilLongBreak = action.payload.sessionsUntilLongBreak;
            state.autoStartBreaks = action.payload.autoStartBreaks;
            state.autoStartWork = action.payload.autoStartWork;
            state.topic = action.payload.topic;
            state.chosenAlarm = action.payload.chosenAlarm;
        }

    }
})