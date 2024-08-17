import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useMutation } from "react-query";
import { addShelve } from "../../service/Data/getShelveData";
import "./addShelve.css";

const AddShelve = ({ show, handleClose, refetch }) => {
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [column, setColumn] = useState("");
  const [layer, setLayer] = useState(0);

  const mutation = useMutation(addShelve, {
    onSuccess: () => {
      refetch();
      handleReset();
      handleClose();
    },
    onError: (error) => {
      console.error(
        "Error adding shelve:",
        error.response ? error.response.data : error.message
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const shelveData = {
      name,
      zone,
      region,
      column,
      layer,
    };

    mutation.mutate(shelveData);
  };

  const handleReset = () => {
    setName("");
    setZone("");
    setRegion("");
    setColumn("");
    setLayer(0);
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-small">
      <Modal.Header closeButton>
        <Modal.Title>Add Shelve</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mb-0 label-left">Shelve Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mb-0 label-left">Zone</Form.Label>
                <Form.Control
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mb-0 label-left">Region</Form.Label>
                <Form.Control
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mb-0 label-left">Column</Form.Label>
                <Form.Control
                  type="text"
                  value={column}
                  onChange={(e) => setColumn(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mb-0 label-left">Layer</Form.Label>
                <Form.Control
                  type="number"
                  value={layer}
                  onChange={(e) => setLayer(parseInt(e.target.value))}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Adding..." : "Add Shelve"}
          </Button>
        </Form>
        {mutation.isError && (
          <p className="mt-3 text-danger">
            Error adding shelve: {mutation.error.message}
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddShelve;
