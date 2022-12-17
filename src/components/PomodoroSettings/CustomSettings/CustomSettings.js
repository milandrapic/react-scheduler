import React, { useRef } from 'react'


const CustomSettings = () => {
  const workT = useRef();
  const breakT = useRef();
  return (
    <React.Fragment>
      <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Work</label><input maxLength={3} className='defaultSettings-input' ref={workT} defaultValue={50} pattern="^[1-9][0-9]*$" /></div>
      <div className='defaultSettings-inputdiv' ><label className='defaultSettings-label' >Break</label><input maxLength={3} className='defaultSettings-input' ref={breakT} defaultValue={10} pattern="^[1-9][0-9]*$" /></div>
      <div className='defaultSettings-timerInputs'>
          <label className='defaultSettings-label'>How to Start Custom Sessions</label>
          <select>
            <option value={1} onClick={() => {
                // playAudio("alarm", 0);
                // dispatch(standardPomoSlice.actions.setChosenAlarm({chosenAlarm: 0}));
              }}>Add Sessions to Queue</option>
            <option value={0} onClick={() => {
                // playAudio("alarm", 1);
                // dispatch(standardPomoSlice.actions.setChosenAlarm({chosenAlarm: 1}));
              }}>Start Session Automatically</option>
            </select>
            <button>Add Session</button>
        </div>
    </React.Fragment>
  )
}

export default CustomSettings