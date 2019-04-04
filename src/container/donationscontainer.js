import React, { Component } from 'react';
import MyDonation from '../components/mydonation'
import { connect } from 'react-redux'

class DonationContainer extends Component {

  renderDonations = () => {
    return this.props.state.currentUser.donations.map( donation => {
      return <MyDonation key= {donation.id} donation={donation} />
    })
  }
  render() {

    return (
      <>
        <h1 className="center"> My Contributions</h1>
        {this.renderDonations()}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(DonationContainer)
