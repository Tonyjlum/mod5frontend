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
    console.log(this.props.state.currentUser.id, "from slot count")

    const already_attending =
      this.props.event.confirms.map(c => c.user_id).includes(this.props.state.currentUser.id)

      if (already_attending) {
        return <strong>Attending</strong>
      } else {
        return slot > 0 ? <Button onClick={() => this.handleClick(this.props.event.id)}> {`Join: ${slot} slots left`}</Button> : `This event is full`
      }

  }
  handleClick = (event_id) => {
    fetch("http://localhost:3000/confirms",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.state.currentUser.id,
        event_id: event_id
      })
    })
    .then(fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then (events => this.props.addEventsToStore(events))
  )
  }

  render(props) {
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
              this.props.donation ? `This project has been funded: $ ${this.props.donation}` : "This project has not been funded"
            }</small>
          </Card.Footer>
        </Card>
    );
  }

}
const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = {
  addEventsToStore: (events) => ({type: "ADD_EVENTS", payload: events})
}


export default connect(mapStateToProps, mapDispatchToProps)(Event);
