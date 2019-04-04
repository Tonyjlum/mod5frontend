import React, { Component } from 'react';
import { connect } from 'react-redux'
import MyEvent from '../components/myevent.js'


class MyEventContainer extends Component {

  renderMyEvents = () => {
    return this.props.state.currentUser.confirm_event_info.map(cli => {
      return (
        <MyEvent
          key={cli.confirm.id}
          event={cli.event}
          confirm={cli.confirm}
          currentUser={this.props.state.currentUser.id}
        />
      )
    })
  }

  renderEventStats = () => {
    if (this.props.currentUser.confirm_event_info.count > 1) {
      return `You have confirmed to ${this.props.currentUser.confirm_event_info.count} events.`
    } else {
      return `You have confirmed to ${this.props.currentUser.confirm_event_info.count} event.`
    }
  }

  render() {
    return (
      <div className="my-event-container">
        <h1 className="center"> My Events</h1>
        <br />
        {this.renderMyEvents()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(MyEventContainer)
