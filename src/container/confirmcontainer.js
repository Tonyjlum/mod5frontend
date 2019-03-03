import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'

class ConfirmContainer extends PureComponent {

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show= {this.props.show}
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
            >
            "Testing"
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >Close</Button>

          </Modal.Footer>
      </Modal>
    );
  }

}

export default ConfirmContainer;
