import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddNodeModal = ({ show, onHide, onAddNode }) => {
  const [nodeName, setNodeName] = useState('');

  const handleAddNode = () => {
    onAddNode(nodeName);
    setNodeName('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Node</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter Node Name"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddNode}>
          Add Node
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNodeModal;
