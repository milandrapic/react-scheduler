import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pomoSettingsSlice } from '../../../features/pomodoro/pomodoro-settings-overlay';
import { standardPomoSlice } from '../../../features/pomodoro/standard-pomodoro-slice';
import AddedCustomSession from './AddedCustomSession/AddedCustomSession';



const CustomSettings = (props) => {
  let initialLoad = true;
  const [sessions, setSessions] = useState([])
  const { customSessions } = useSelector(state => state.standardPomo);
  const workT = useRef();
  const breakT = useRef();
  const topic = useRef();
  const autoStartWork = useRef();
  const autoStartBreaks = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if(initialLoad){
      setSessions(customSessions);
      initialLoad = false;
    }
  }, [customSessions])

  const addTopic = (event) => {
    event.preventDefault();
    const newSession = {
      workTime: workT.current.value,
      breakTime: breakT.current.value,
      topic: topic.current.value,
      autoStartWork: autoStartWork.current.checked,
      autoStartBreaks: autoStartBreaks.current.checked
    };
    setSessions((sessions) => [...sessions, newSession]);
    console.log(sessions);
  }

  const deleteSession = (index) => {
    setSessions(sessions.filter((session, i) => i !== index));
  }
  
  const addedSessions = sessions.map((session, index) => <AddedCustomSession key={index} index={index} session={session} deleteSession={deleteSession} />);
  const onSubmitCustomSessions = (event) => {
    event.preventDefault();
    dispatch(standardPomoSlice.actions.setSessions({sessions: sessions}));
    dispatch(pomoSettingsSlice.actions.toggleOverlay());
  }
  return (
    <React.Fragment>
      <form onSubmit={onSubmitCustomSessions}>
      <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Work</label><input maxLength={3} className='defaultSettings-input' ref={workT} defaultValue={50} pattern="^[1-9][0-9]*$" /></div>
      <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Break</label><input maxLength={3} className='defaultSettings-input' ref={breakT} defaultValue={10} pattern="^[1-9][0-9]*$" /></div>
      <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Topic</label><input className='defaultSettings-input' ref={topic} /></div>
      <div className='defaultSettings-timerInputs'>
          <label className='defaultSettings-label' >Automatically Start Work Session</label>
          <input 
            type="checkbox"
            defaultChecked={false}
            ref={autoStartWork}
          />
          <br></br>
          <label className='defaultSettings-label' >Automatically Start Break</label>
          <input 
            type="checkbox"
            defaultChecked={false}
            ref={autoStartBreaks}
          />
      </div>
      {/* <div className='defaultSettings-timerInputs'>
          <label className='defaultSettings-label'>How to Start Custom Sessions?</label>
          <select>
            <option value={1}>Add Sessions to Queue</option>
            <option value={0}>Start Session Automatically</option>
          </select>
      </div> */}
      <button onClick={addTopic}>Add Session</button>
      <br></br>
      <hr></hr>
      {/* <label>Custom Sessions</label> <br></br> */}
      {addedSessions}
      <hr></hr> 
      <button type='submit'>OK</button>
      </form>
    </React.Fragment>
  )
}

export default CustomSettings