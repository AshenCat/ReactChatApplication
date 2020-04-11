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
        <Row className="justify-content-md-center">
          <Col sm={9}>
            <h1>{this.state.room}</h1>
            <MessageArea alltext={this.state.alltext}></MessageArea>
            <MessageComposer
              room={this.state.room}
              name={this.state.name}
            ></MessageComposer>
          </Col>
          <Col sm={3} className="d-none d-sm-block">
            <UserList userList={this.state.userList} /></Col>
        </Row>
      </Container >
    );
  }
}
