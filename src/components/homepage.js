import React from 'react'
import HomepageBottomContainer from '../container/homepagebottom.js'
import GuestSponsorButton from './guestsponsorbutton.js'
import GuestVolunteerButton from './guestvolunteerbutton.js'


const Homepage = () => {
  return(
    <>
      <div className= "homepage-top">
        <img
          src="https://i.ibb.co/hDvg3YG/Untitled.png"
          alt="Be the change you want to see in the world Plan it with Helping Hand and let the world know how they can help."
          width= "100%"
          position= "absolute"
          />
        <div className="landing-text">
          <h1>Be the change <br />you want to see in the world</h1><br />
          <h4>Plan it with Helping Hand and <br /> let the world know how they can help.</h4>
          <GuestVolunteerButton />
          <GuestSponsorButton />
        </div>
      </div>
      <HomepageBottomContainer className="homepage-bottom" />
    </>
  )
}

export default Homepage
