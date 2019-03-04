import React, { Component } from 'react';
import { connect } from 'react-redux'
import MyEvent from '../components/myevent.js'


class MyEventContainer extends Component {

  renderMyEvents = () => {
    return this.props.state.currentUser.confirm_event_info.map(cli => {
      return <MyEvent key={cli.confirm.id} event={cli.event}  confirm={cli.confirm} currentUser={this.props.state.currentUser.id}/>
    })
  }

  render() {
    return (
      <div>
        <h1 className="center"> My Events</h1>
        <br/>
        {this.renderMyEvents()}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(MyEventContainer)
