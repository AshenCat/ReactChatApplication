import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import Axios from "axios";

const ShowEditModal = () => {
  console.log("did edit load?")
  let roomName = undefined;
  let _id = "";
  let editRoom = () => {
    Axios.patch(`http://localhost:3001/api/rooms/edit-room/${_id}`);
  };
  let handlePillChange = (value) => {
    let status = value;
    console.log(`Status ${status} RoomName ${roomName}`);
  };
  let handleChange = (event) => {
    roomName = event.target.value;
  };
  const [show, toggle] = useState(true);
  const handleNoSaveClose = () => toggle(false);
  const handleClose = () => {
    toggle(false);
  };
  const handleShow = () => toggle(true);
  return (
    <>
      <Modal animation={false} show={show} onHide={handleNoSaveClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
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

export default ShowEditModal;
