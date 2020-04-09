import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";

const ShowEditModal = () => {
  let _id = "";
  let editRoom = () => {
    Axios.patch(`http://localhost:3001/api/rooms/edit-room/${_id}`);
  };
  const [show, toggle] = useState(false);
  const handleClose = () => toggle(false);
  const handleShow = () => toggle(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Room Name:
          <input></input>
          <br></br>
          Status:
          <select>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
