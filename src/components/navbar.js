import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter} from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

class NavigationBar extends Component {

  componentDidMount() {
    // fetchFromApi.then(res => {
    //   this.props.addResultsToStore(res)
    // })
  }

  //make the nav bar load conditionally
//replace href with onClick={() => this.props.history.push(end url)}
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick = {() => this.props.history.push("/")}>HelpingHand</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick = {() => this.props.history.push("/events")}>Events</Nav.Link>
          <Nav.Link onClick = {() => this.props.history.push("/attending")}>Attending</Nav.Link>
          <Nav.Link onClick = {() => this.props.history.push("/hosting")}>Hosting</Nav.Link>
        </Nav>
          <Button
            onClick = {() => this.props.history.push("/newmember")}
            variant="outline-info"
            size="sm"
          >
            Become a Member
          </Button>
          <Button
            onClick = {() => this.props.history.push("/login")}
            variant="outline-info"
            size="sm"
          >
            Login
          </Button>
      </Navbar>
    );
  }

}

// gets the state from index.js and only show what you allow
//logged in is not shown because it was not allowed in
const mapStateToProps = (state) => {
  // return state
  return {test: state.test}
}

//send changes to the state in index.js
const mapDispatchToProps = {
  // sendToStore: () => ({type: 'MY_ACTION'}),
  // addResultsToStore: (res) => ({type: 'FETCH_RESULTS', payload: res})
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar))
