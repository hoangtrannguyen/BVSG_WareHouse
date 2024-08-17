import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditModal = ({ show, handleClose, item, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    zone: "",
    region: "",
    column: "",
    layer: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        zone: item.zone || "",
        region: item.region || "",
        column: item.column || "",
        layer: item.layer || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formZone">
                <Form.Label>Zone</Form.Label>
                <Form.Control
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formRegion">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formColumn">
                <Form.Label>Column</Form.Label>
                <Form.Control
                  type="text"
                  name="column"
                  value={formData.column}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formLayer">
                <Form.Label>Layer</Form.Label>
                <Form.Control
                  type="number"
                  name="layer"
                  value={formData.layer}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
