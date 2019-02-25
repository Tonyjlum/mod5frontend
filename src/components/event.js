import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import Moment from 'react-moment';
import { connect } from 'react-redux'

class Event extends Component {
  //save a state for the slot count and cut it off at 0

  fundedColor = () => {
    if (this.props.donation === 0){
      return "danger"
    } else {
      return "primary"
    }
  }
  slotCount = () => {
    const slot = this.props.event.max_volunteers - this.props.event.confirms.length
     return slot > 0 ? <Button onClick={() => this.handleClick(this.props.event.id)}> {`Join: ${slot} slots left`}</Button> : `This Event is full`
  }
  handleClick = (event_id) => {
    fetch("http://localhost:3000/confirms",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        event_id: event_id
      })
    })
    .then(response => response.json())
    .then(json => this.props.addConfrimToState(json))
    //make post request with the Id and user id to back end
    // add this user to the page,
    //check if the user is attending the event already.
  }

  render(props) {
    console.log(this.props)
    return (
        <Card border={this.fundedColor()}>
          <Card.Body>
            <Card.Title>{this.props.event.title}</Card.Title>
            <Card.Text>{this.props.event.description}</Card.Text>
            <Card.Text>
              <Moment format="L" className= "date-event-card">{this.props.event.datetime}</Moment>
              <br/>
              <Moment format="LT" className="time-event-card">{this.props.event.datetime}</Moment>
            </Card.Text>
            {this.slotCount()}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{
              this.props.donation ? `This project has been funded: $ ${this.props.donation}` : "This project has not funded"
            }</small>
          </Card.Footer>
        </Card>
    );
  }

}
const mapStateToProps = (state) => {
  return {events: state.events}
}

const mapDispatchToProps = {
  addConfrimToState: (confirm) => ({type: "ADD_CONFIRM_TO_STATE", payload: confirm})
}


export default connect(mapStateToProps, mapDispatchToProps)(Event);
