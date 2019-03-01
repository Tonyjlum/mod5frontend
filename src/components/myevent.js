import React, { Component } from 'react';
import {Card, Button, Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'
import EditModal from './editmodal.js'

class MyEvent extends Component {
  state = {
    modalShow : false
  }

  renderButtons = (props) => {
    if (props.event.coordinator_id === props.currentUser){
      return(
        <div className="space-button">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => this.setState({ modalShow: true })}
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

  handleEdit = (event) => {
    console.log("from handle edit", event)
    this.setState({
      modalShow: !this.state.modalShow
    }, () => console.log(this.state))
    //set state of modal to show
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
              {this.props.event.description}
            </Card.Text>
          </Card.Body>
          {this.renderButtons(this.props)}
          </Col>
          </Row>
        </Card>
        </Card.Body>
        <EditModal show={this.state.modalShow} onHide={this.handleEdit} event={this.props.event}/>
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
