import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playAudio } from '../../../utils/AlarmHelper';
import { standardPomoSlice } from '../../../features/pomodoro/standard-pomodoro-slice';
import { pomoSettingsSlice } from '../../../features/pomodoro/pomodoro-settings-overlay';

const DefaultSettings = () => {
  const { autoStartWork, autoStartBreaks, sessionsUntilLongBreak, } = useSelector(state => state.standardPomo);
  const dispatch = useDispatch();
  const workTime = useRef();
  const shortBreakTime = useRef();
  const longBreakTime = useRef();
  const numSessionsUntilLongBreak = useRef();
  const autoStartB = useRef();
  const autoStartW = useRef();

  return (
    <React.Fragment>
    <form onSubmit={(event) => {
        event.preventDefault();
        const action =  {
            workTime: workTime.current.value,
            shortBreakTime: shortBreakTime.current.value,
            longBreakTime: longBreakTime.current.value,
            sessionsUntilLongBreak: numSessionsUntilLongBreak.current.value,
            autoStartWork: autoStartW.current.checked,
            autoStartBreaks: autoStartB.current.checked
        };
        console.log(action.payload, action.workTime * 60);
        dispatch(standardPomoSlice.actions.submitDefaultSettings(action));
        dispatch(pomoSettingsSlice.actions.toggleOverlay());

    }}>
    <div>
        <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Work</label><input maxLength={3} className='defaultSettings-input' ref={workTime} defaultValue={50} pattern="^[1-9][0-9]*$" /></div>
        <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Short Break</label><input maxLength={3} className='defaultSettings-input' ref={shortBreakTime} defaultValue={10} pattern="^[1-9][0-9]*$" /></div>
        <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Long Break</label><input maxLength={3} className='defaultSettings-input' ref={longBreakTime} defaultValue={30} pattern="^[1-9][0-9]*$" /></div>
    </div>
    <div className='defaultSettings-timerInputs'>
                <label className='defaultSettings-label' >Alarm Sound</label>
                <select>
                <option value={0} onClick={() => {
                    playAudio("alarm", 0);
                    dispatch(standardPomoSlice.actions.setChosenAlarm({chosenAlarm: 0}));
                }}>1</option>
                <option value={1} onClick={() => {
                    playAudio("alarm", 1);
                    dispatch(standardPomoSlice.actions.setChosenAlarm({chosenAlarm: 1}));
                }}>2</option>
                <option value={2} onClick={() => {
                    playAudio("alarm", 2);
                    dispatch(standardPomoSlice.actions.setChosenAlarm({chosenAlarm: 2}));
                }}>3</option>
                <option value={3} onClick={() => {
                    playAudio("alarm", 3);
                    dispatch(standardPomoSlice.actions.setChosenAlarm({chosenAlarm: 3}));
                }}>4</option>
                </select>
            </div>
            <hr></hr>
        <div className='defaultSettings-timerInputs'>
            <label className='defaultSettings-label' >Intervals Until Long Break</label>
            <input
                type="number"
                maxLength={3} 
                min={1}
                className='defaultSettings-input' 
                defaultValue={sessionsUntilLongBreak} 
                pattern="^[1-9][0-9]*$"
                ref={numSessionsUntilLongBreak}
            />
        </div>
        <hr></hr>
            <div className='defaultSettings-timerInputs'>
                <label className='defaultSettings-label' >Automatically Start Work Sessions</label>
                <input 
                    type="checkbox"
                    defaultChecked={autoStartWork}
                    ref={autoStartW}
                />
                <br></br>
                <label className='defaultSettings-label' >Automatically Start Breaks</label>
                <input 
                    type="checkbox"
                    defaultChecked={autoStartBreaks}
                    ref={autoStartB}
                />
            </div>
            <hr></hr>
        <button type='submit'>OK</button>
    </form>
    </React.Fragment>
  )
}

export default DefaultSettings