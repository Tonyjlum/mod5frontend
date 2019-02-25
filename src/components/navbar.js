import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

class NavigationBar extends Component {

  componentDidMount() {
    // fetchFromApi.then(res => {
    //   this.props.addResultsToStore(res)
    // })
  }

  //make the nav bar load conditionally

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">HelpingHand</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/attending">Attending</Nav.Link>
          <Nav.Link href="/hosting">Hosting</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
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



export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
