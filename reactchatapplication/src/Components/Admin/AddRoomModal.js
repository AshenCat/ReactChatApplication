import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import Axios from "axios";

const ShowAddModal = () => {
  let roomName = "";
  let status = "Active";
  let addRoom = () => {
    Axios.post("http://localhost:3001/api/rooms/add-room", {
      Name: roomName,
      Status: status,
    })
      .then((response) => {
        console.log(`${response.data} added`);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(`OnClick: Status ${status} RoomName ${roomName}`);
  };
  let handlePillChange = (value) => {
    status = value;
    console.log(`Status ${status} RoomName ${roomName}`);
  };
  let handleChange = (event) => {
    roomName = event.target.value;
  };
  const [show, toggle] = useState(false);
  const handleNoSaveClose = () => toggle(false);
  const handleClose = () => {
    toggle(false);
    addRoom();
  };
  const handleShow = () => toggle(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Room
      </Button>

      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Room Name:
          <Form.Control
            required
            onChange={handleChange}
            type="text"
            placeholder="Enter Room Name"
          />
          <br></br>
          Status:
          <Nav variant="pills" defaultActiveKey="Active">
            <Nav.Item>
              <Nav.Link onSelect={handlePillChange} eventKey="Active">
                Active
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onSelect={handlePillChange} eventKey="Inactive">
                Inactive
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNoSaveClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowAddModal;
