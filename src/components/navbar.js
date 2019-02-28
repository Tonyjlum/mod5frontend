import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter} from "react-router-dom"
import { Navbar, Nav, Button } from 'react-bootstrap'

class NavigationBar extends Component {


  navbarForUser = () => {
    if (this.props.state.currentUser.id === null){
      return(
        <div className="space-button">
        <Button
          onClick = {() => this.props.history.push("/newmember")}
          variant="outline-info"
        >
          Become a Member
        </Button>
        <Button
          onClick = {() => this.props.history.push("/login")}
          variant="outline-info"
        > Sign in
        </Button>
        </div>
      )
    } else {
      return(
        <div className="log-out-button">

      <Button
        onClick = {() => {
          this.props.history.push("/")
          this.props.removeCurrentUser()
        }}
        variant="outline-info"
      > Sign out
      </Button>
      </div>
    )
    }
  }

  //make the nav bar load conditionally
//replace href with onClick={() => this.props.history.push(end url)}
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick = {() => this.props.history.push("/")}>HelpingHand</Navbar.Brand>
        <Nav className="mr-auto">
          {this.props.state.currentUser.id && <Nav.Link onClick = {() => this.props.history.push("/events")}>How Can I Help?</Nav.Link>}
          {this.props.state.currentUser.id && <Nav.Link onClick = {() => this.props.history.push("/attending")}>My Events</Nav.Link>}
          {this.props.state.currentUser.id && <Nav.Link onClick = {() => this.props.history.push("/hosting")}>Hosting</Nav.Link>}
        </Nav>
        {this.navbarForUser()}
      </Navbar>
    );
  }

}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = {
  removeCurrentUser: () => ({type:"REMOVE_CURRENT_USER", payload: {id: null}})
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar))
