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
          localStorage.removeItem("user")
        }}
        variant="outline-info"
      > Sign out
      </Button>
      </div>
    )
    }
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand onClick = {() => this.props.history.push("/")}>
        HelpingHand</Navbar.Brand>
        <Nav className="mr-auto">
          {this.props.state.currentUser.id && <Nav.Link onClick = {() => this.props.history.push("/events")}>How Can I Help?</Nav.Link>}

          {
            this.props.state.sponsor ? (<Nav.Link onClick = {() => this.props.history.push("/contribution")}>My Contributions</Nav.Link>) :
            (this.props.state.currentUser.id && <Nav.Link onClick = {() => this.props.history.push("/attending")}>My Events</Nav.Link>)}

        </Nav>
        <Navbar.Brand >
          {this.props.state.sponsor && `Total Contribution: $ ${this.props.state.currentUser.total_donations}.00`}
          {this.props.state.sponsor === false && this.props.state.currentUser.id !== null && `Credit Earned: $ ${this.props.state.currentUser.credit}.00`}
        </Navbar.Brand>
        <Navbar.Brand>
        {this.props.state.currentUser.email}
        </Navbar.Brand>
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
