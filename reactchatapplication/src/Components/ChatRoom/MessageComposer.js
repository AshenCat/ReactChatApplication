import React from "react";
import { socket } from "../../App";
import { Form, Button, InputGroup } from "react-bootstrap";
import moment from "moment";

class MessageComposer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      room: this.props.room,
      msg: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ msg: event.target.value });
  };

  handleSubmit = () => {};

  sendMessage = () => {
    // substitute time for something more meaningful
    let time = moment().format("HH:mm:ss");
    if (this.state.msg !== "") {
      let message = {
        by: this.state.name,
        msg: this.state.msg,
        room: this.state.room,
        time: time,
      };
      socket.emit("message", message);
    }
    this.handleSubmit();
  };

  onEnterKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  };
  render() {
    return (
      <InputGroup className="composeArea">
        <Form.Control
          size="lg"
          className="composeField"
          onKeyDown={this.onEnterKey}
          onChange={this.handleChange}
          type="text"
          placeholder="Type here..."
        />
        <Button variant="dark" onClick={this.sendMessage}>
          Send
        </Button>
      </InputGroup>
    );
  }
}

export default MessageComposer;
