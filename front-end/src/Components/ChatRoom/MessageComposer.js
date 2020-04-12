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
    this.handleFields = this.handleFields.bind(this);
  }

  handleFields = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = () => { };

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
    this.setState({ msg: '' });
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
          name="msg"
          value={this.state.msg}
          className="composeField"
          onKeyDown={this.onEnterKey}
          onChange={this.handleFields}
          type="text"
          placeholder="Type here..."
        />
        <Button type="submit" variant="dark" onClick={this.sendMessage}>
          Send
        </Button>
      </InputGroup>
    );
  }
}

export default MessageComposer;
