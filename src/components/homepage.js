import React from 'react'
import HomepageBottomContainer from '../container/homepagebottom.js'

import {CardGroup, Card} from 'react-bootstrap'

const Homepage = (props) => {
  return(
    <>
      <div class= "homepage-top">
        <img
          src="https://i.ibb.co/hDvg3YG/Untitled.png"
          width= "100%"
          position= "absolute"
          />
          <div class="landing-text">
            <h1>Be the change <br/>
            you want to see
            in the world</h1>
            <br/>
            <h4>Plan it with Helping Hand and <br/> let the world know how they can help.</h4>
          </div>
      </div>
      <HomepageBottomContainer className="homepage-bottom"/>
    </>
  )
}

export default Homepage
