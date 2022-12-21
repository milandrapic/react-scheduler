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
    timerType: 0, // 0 = work, 1 = short break, 2 = long break, 3 = custom work, 4 = custom break
    sid: 0,
    sessions: [], // these are the past sessions that the user has completed
    currentCustomSession: {},
    customSessions: [] // these are the future sessions that the user has set
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
            // console.log(secsBetween);
            // console.log(state.sessions);
            state.timeElapsed = secsBetween;
            state.seconds = state.duration - secsBetween;
        },
        newTimerReset: (state) => {
            // add current values to session history
            if(state.timerType == 0 || state.timerType == 3){
                
                state.sessions = [...state.sessions,{
                    sid: state.numberOfWorkSessions,
                    timeWorked: state.timeElapsed,
                    targetTimeWorked: (state.timerType == 0 ? state.workTime : state.currentCustomSession.workTime) * 60, // in seconds
                    topic: state.topic
                }]
                state.numberOfWorkSessions += 1;
                // console.log(state.sessions);
            }

            // check if there are any custom sessions
            if(state.customSessions.length > 0 || (state.customSessions.length == 0 && state.timerType == 3)){
                if(!(state.timerType == 0 || state.timerType == 3)){
                    const nextSession = state.customSessions.shift();
                    state.currentCustomSession = nextSession;
                    state.duration = nextSession.workTime * 60;
                    state.seconds = nextSession.workTime * 60;
                    state.timeElapsed = 0;
                    state.startTime = getLocalTime().toString();
                    state.topic = nextSession.topic;
                    state.timerActive = nextSession.autoStartWork;
                    state.timerType = 3;
                    return;
                }
                else if ((state.customSessions.length == 0 && state.timerType == 3)){
                    state.topic = '';
                }
                else if (state.timerType == 3){
                    state.duration = state.currentCustomSession.breakTime * 60;
                    state.seconds = state.currentCustomSession.breakTime * 60;
                    state.startTime = getLocalTime().toString();
                    state.timeElapsed = 0;
                    state.timerActive = state.currentCustomSession.autoStartBreaks;
                    state.timerType = 4;
                    return;
                }
                
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
            // console.log(action)
            // console.log(secs, "secs", action.payload.workTime, "workTime");
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
        },
        setSessions: (state, action) => {
            state.customSessions = action.payload.sessions;
        }

    }
})
