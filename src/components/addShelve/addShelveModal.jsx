import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { addShelve } from "../../service/Data/getShelveData";

const AddShelve = ({ show, handleClose, refetch }) => {
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [column, setColumn] = useState("");
  const [layer, setLayer] = useState(0);

  const mutation = useMutation(addShelve, {
    onSuccess: (data) => {
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
      name: name,
      zone: zone,
      region: region,
      column: column,
      layer: layer,
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Shelve</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Shelve Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zone:</Form.Label>
            <Form.Control
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Region:</Form.Label>
            <Form.Control
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Column:</Form.Label>
            <Form.Control
              type="text"
              value={column}
              onChange={(e) => setColumn(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Layer:</Form.Label>
            <Form.Control
              type="number"
              value={layer}
              onChange={(e) => setLayer(parseInt(e.target.value))}
              required
            />
          </Form.Group>
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
