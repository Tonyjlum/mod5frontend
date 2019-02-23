import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom"

import { connect } from 'react-redux'

class Navbar extends Component {

  componentDidMount() {
    // fetchFromApi.then(res => {
    //   this.props.addResultsToStore(res)
    // })
  }

  render() {
    return (
      <div onClick={this.props.sendToStore}>


        {this.props.logged_in }
      </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
