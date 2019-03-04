// have an on change on radio button, make it record to the state of its parent

import React from 'react'

const ConfirmVolunteer = (props) => {
  return (
    <div>
    {props.confirm.attendee_name}
    &nbsp;-- {props.confirm.attendee_email}
    <div className="radio-button" onChange={(e) => {props.handleRadio(props.confirm.id, e.target.value)}}>
      <input type="radio"
      id={props.confirm.attendee_email}
      name={props.confirm.attendee_email}
      value= {true}
      checked={props.confirm.attend ? "checked" : null}
      /> Attended
      &nbsp;&nbsp;
      <input type="radio"
      id={props.confirm.attendee_email}
      name={props.confirm.attendee_email}
      value={false}
      checked={props.confirm.attend ? null : "checked"}
      /> Did not attend
    </div>
    <hr/>
    </div>
  )
}
 export default ConfirmVolunteer
