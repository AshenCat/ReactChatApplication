import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import EventHistory from "./EventHistory";
import ChatHistory from "./ChatHistory";

class AdminLanding extends React.Component {
  state = {
    location: undefined,
  };

  whichToRender = () => {
    if (this.state.location === "" || this.state.location === undefined) {
      return null;
    } else if (this.state.location === "eventHistory") {
      return <EventHistory></EventHistory>;
    } else if (this.state.location === "chatHistory") {
      return <ChatHistory></ChatHistory>;
    } else if (this.state.location === "roomManager") {
      return null;
    }
  };

  setLocation(value) {
    console.log(`setting location to ${value}`);
    this.setState({ location: value });
    console.log(`location set to ${this.state.location}`);
  }
  render() {
    return (
      <>
        <Container className="landingContainer">
          <Col>
            <Row className="justify-content-md-center">
              <Col>
                <Row className="justify-content-md-center">
                  <Button
                    type="button"
                    onClick={() => this.setLocation("eventHistory")}
                  >
                    Event History
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="justify-content-md-center">
                  <Button
                    type="button"
                    onClick={() => this.setLocation("chatHistory")}
                  >
                    Chat History
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="justify-content-md-center">
                  <Button
                    type="button"
                    onClick={() => this.setLocation("roomManager")}
                  >
                    Rooms
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <this.whichToRender />
            </Row>
          </Col>
        </Container>
      </>
    );
  }
}

export default AdminLanding;
