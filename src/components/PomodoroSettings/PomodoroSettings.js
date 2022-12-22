import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDom from 'react-dom';
import './PomodoroSettings.css';
import { pomoSettingsSlice } from '../../features/pomodoro/pomodoro-settings-overlay';
import DefaultSettings from './DefaultSettings/DefaultSettings';
import CustomSettings from './CustomSettings/CustomSettings';

const Backdrop = () => {
    const { isActive } = useSelector(state => state.pomoSettingsOverlay);
    return (
    <div className={isActive?"pomosettings-backdrop":""} />
    )
}

const Overlay = () => {
    const { isActive, isCustom } = useSelector(state => state.pomoSettingsOverlay);
    const dispatch = useDispatch()
    return isActive?(
        <div className={"pomosettings-div"}>
            <button onClick={()=>{
                dispatch(pomoSettingsSlice.actions.toggleCustom());
            }}>{isCustom?"Standard":"Custom"}</button>
            {isCustom?<CustomSettings />:<DefaultSettings />}
            <button onClick={()=>{
                dispatch(pomoSettingsSlice.actions.toggleOverlay());
            }}>Close</button>
        </div>
    ):null
}

const PomodoroSettings = () => {
  return (
    <React.Fragment>
        {ReactDom.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
        {ReactDom.createPortal(<Overlay />, document.getElementById("overlay-root"))}
    </React.Fragment>
  )
}

export default PomodoroSettings