import React from 'react'

const PastSession = (props) => {
  const {sid, timeWorked, targetTimeWorked, topic } = props.session;
  return (
    <div>
        <div><label>Session ID</label><p>{sid}</p></div>
        <div><label>Time Worked</label><p>{timeWorked}</p></div>
        <div><label>Expected Session Length</label><p>{targetTimeWorked}</p></div>
        <div><label>Topic</label><p>{topic}</p></div>
    </div>
  )
}

export default PastSession