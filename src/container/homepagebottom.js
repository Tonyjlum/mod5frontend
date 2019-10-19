import React from 'react'
import {CardGroup, Card} from 'react-bootstrap'

const HomepageBottomContainer = () => {
  return (
    <CardGroup>
      <Card className="home-card">
      </Card>
      <Card className="home-card">
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/1006/1006652.svg"
          heigh="50px"
        />
        <Card.Body>
        <Card.Text>
          <h3 className="center"> ORGANIZE</h3>
          <div className="text-muted center">Organize an event to invoke the change and inspire the community to come together for the greater good.</div>
        </Card.Text>
        </Card.Body>
      </Card>
    <Card className="home-card">
      <Card.Img
        variant="top"
        src="https://image.flaticon.com/icons/svg/1006/1006623.svg"
        heigh="50px"
      />
      <Card.Body>
      <Card.Text>
        <h3 className="center"> DISCOVER</h3>
        <div className="text-muted center">Find others like yourself with the same passion.</div>
      </Card.Text>
      </Card.Body>
    </Card>
    <Card className="home-card">
      <Card.Img
        variant="top"
        src="https://image.flaticon.com/icons/svg/1534/1534938.svg"
        heigh="50px"
      />
      <Card.Body>
      <Card.Text>
        <h3 className="center"> GIVE </h3>
        <div className="text-muted center">While attending events, volunteers will earn a credited amount to donate to a charity of their choice.</div>
      </Card.Text>
      </Card.Body>
    </Card>
    <Card className="home-card">
    </Card>
    </CardGroup>
  )
}

export default HomepageBottomContainer
