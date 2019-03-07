import React, { Component } from 'react';
import NewAccountFrom from '../components/newaccountform.js'
import {Button, Row, Col} from 'react-bootstrap'

class NewUserContainer extends Component {
  state = {
    showButton: true,
    showForm: false,
    accountType: null
  }

  handlebuttonselect = (selection) => {
    this.setState({
      showButton: !this.state.showButton,
      showForm: !this.state.showForm,
      accountType: selection
    }, () => console.log(this.state))
  }


  render() {
    return (
        <Row className="justify-content-md-center" >
          <Col xs lg="9">
          {this.state.showButton && <Button onClick={()=>{this.handlebuttonselect("users")}}>I want to help as a Volunteer</Button>}
          <br/>
          <br/>
          {this.state.showButton && <Button onClick={()=>{this.handlebuttonselect("sponsors")}}>I want to help by becoming a Sponsor</Button>}
          {this.state.showForm && <NewAccountFrom accountType={this.state.accountType}/>}
          </Col>
        </Row>

    );
  }

}

export default NewUserContainer ;
