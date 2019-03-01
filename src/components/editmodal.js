import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

class EditModal extends Component {

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show= {this.props.show}
        //set show to true for it to show up
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

      //Render Form in here, then  fetch for an update.
          <h4>{this.props.event.title}</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide()} >Close</Button>
          <Button onClick={() => this.props.onHide()} >Update Event</Button>

        </Modal.Footer>
      </Modal>
    );
  }

}

export default EditModal;
