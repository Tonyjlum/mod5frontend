import React, { Component } from 'react';
import {Card, Button, Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'
import EditModal from './editmodal.js'
import Moment from 'react-moment'
import ConfirmContainer from '../container/confirmcontainer.js'

class MyEvent extends Component {
  state = {
    editModalShow : false,
    confirmContainerModalShow: false
  }

  renderButtons = (props) => {
    if (Date.parse(props.event.datetime) < Date.parse(new Date()) ){
      return this.renderButtonsofPassEvents(props)
    } else {
      return this.renderButtonsofUpcomingEvents(props)
    }
  }

  renderButtonsofPassEvents = (props) => {
    if (props.event.coordinator_id === props.currentUser){
      return (<Button
        variant="outline-success"
        size="sm"
        onClick={() => this.setState({ confirmContainerModalShow: true })}
        >Confirm Volunteers</Button>)
    } else {
      const attendance = props.confirm.attend ? "Thank you for Volunteering": ""
      return (<Card.Text>
        {`Event Completed. ${attendance}`}
      </Card.Text>)
    }
  }


  renderButtonsofUpcomingEvents = (props) => {
    if (props.event.coordinator_id === props.currentUser){
      return(
        <div className="space-button">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => this.setState({ editModalShow: true })}
            >Edit Event</Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick = {() => {this.handleDelete(props.event.id, props.confirm)}}
            >Delete Event</Button>
        </div>
      )
    } else {
      return (<Button
        variant="outline-danger"
        size="sm"
        onClick={()=>{this.handleLeave(props.confirm)}}
        >Leave Event</Button>)
    }
  }

  handleLeave = (confirm) => {
    fetch(`http://localhost:3000/confirms/${confirm.id}`, {
      method: "DELETE"
    })
    .then( response => response.json() )
    .then( json => this.filterDeletedConfirm(json) )
    .then( filteredConfirms => this.props.updateConfirms(filteredConfirms) )
  }

  handleDelete = (event_id, confirm) => {
    fetch(`http://localhost:3000/events/${event_id}`,{
      method: "DELETE"
    })
    .then( () => {
      const updatedCEI = this.filterDeletedEventFromCEI(confirm)
      this.props.updateConfirms(updatedCEI)
    })
  }

  toggleEditModal = () => {
    this.setState({
      editModalShow: !this.state.editModalShow
    })
  }

  toggleConfrimModal = () => {
    this.setState({
      confirmContainerModalShow: !this.state.confirmContainerModalShow
    })
  }

  filterDeletedEventFromCEI = (confirm) => {
    return this.props.state.currentUser.confirm_event_info.filter( cei => {
      return cei.confirm.id  !== confirm.id
    })
  }

  filterDeletedConfirm = (json) => {
    return this.props.state.currentUser.confirm_event_info.filter( cei => {
      return cei.confirm.id !== json.destroyed_confirm_id
    })
  }

  render(){
    return (
      <div>
        <Card.Body className="my-event-card">
        <Card className="text-center">
        <Row className="justify-content-md-center">
        <Col xs={7} className>
          <Card.Body>
            <Card.Title>{this.props.event.title}</Card.Title>
            <Card.Text>
              <Moment locale="en" format="MMMM DD, YYYY" date={this.props.event.datetime}/>
              &nbsp;at&nbsp;
              <Moment locale="en"format="HH:MM a" date={this.props.event.datetime}/>
            </Card.Text>

            <Card.Text>
              {this.props.event.description}
            </Card.Text>
          </Card.Body>
          {this.renderButtons(this.props)}
          </Col>
          </Row>
        </Card>
        </Card.Body>
        <EditModal show={this.state.editModalShow} onHide={this.toggleEditModal} event={this.props.event}/>

        <ConfirmContainer
          show={this.state.confirmContainerModalShow}
          onHide={this.toggleConfrimModal}
          event={this.props.event}
          confirms={this.props.confirm}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}


const mapDispatchToProps = {
  updateConfirms: (updated_confrim) => ({type: "UPDATE_CONFIRMS", payload: updated_confrim})
}


export default connect(mapStateToProps, mapDispatchToProps)(MyEvent)
