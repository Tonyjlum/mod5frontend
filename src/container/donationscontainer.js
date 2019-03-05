import React, { Component } from 'react';
import MyDonation from '../components/mydonation'
import { connect } from 'react-redux'

class DonationContainer extends Component {

  renderDonations = () => {
    console.log(this.props.state)
    return this.props.state.currentUser.donations.map( donation => {
      return <MyDonation key= {donation.id}donation={donation} />
    })
  }
  render() {

    return (
      <div>
        {this.renderDonations()}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(DonationContainer)
