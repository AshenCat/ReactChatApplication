import React from "react";
import MessageArea from "./MessageArea";
import MessageComposer from "./MessageComposer";
import UserList from "./UserList";
import { Container, Col, Row } from "react-bootstrap";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alltext: [],
      room: this.props.selectedRoom,
      name: this.props.name,
      userList: this.props.userList,
    };
  }
  render() {
    return (
      <Container className="chatContainer">
        <Col lg={12}>
          <Row className="justify-content-md-center">
            <h1>{this.state.room}</h1>
          </Row>
          <Row>
            <Col lg={10}>
              <MessageArea alltext={this.state.alltext}></MessageArea>
              <MessageComposer
                room={this.state.room}
                name={this.state.name}
              ></MessageComposer>
            </Col>
            <Col sm={2}>
              <UserList userList={this.state.userList} />
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}
