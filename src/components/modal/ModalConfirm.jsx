import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import QRScanner from "../QRScan/QrScan";
import "./modalConfirm.css";

const ConfirmModal = ({ show, onHide, item, onConfirm }) => {
  const [formData, setFormData] = useState({
    acceptNo: "",
    itemNo: "",
    itemName: "",
    enterQty: "",
    shelveValue: "",
    acceptUnits: "",
  });
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        acceptNo: item.acceptNo || "",
        itemNo: item.itemNo || "",
        itemName: item.itemName || "",
        enterQty: item.enterQty || "",
        acceptUnits: item.acceptUnits || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
    onHide();
  };

  const handleScan = (data) => {
    setFormData((prevData) => ({ ...prevData, shelveValue: data }));
    setIsScanning(false);
  };

  const handleCloseModal = () => {
    setIsScanning(false);
    setFormData((prevData) => ({ ...prevData, shelveValue: "" }));
    onHide();
  };

  const handleCloseScanner = () => {
    setIsScanning(false);
    setFormData((prevData) => ({ ...prevData, shelveValue: "" }));
  };

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isScanning ? (
          <QRScanner onScan={handleScan} onClose={handleCloseScanner} />
        ) : (
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="acceptNo">
                  <Form.Label>Accept No</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="acceptNo"
                    value={formData.acceptNo}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="shelve">
                  <Form.Label>Shelve</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      size="lg"
                      name="shelve"
                      value={formData.shelveValue}
                      readOnly
                    />
                    <InputGroup.Text>
                      <Button
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => setIsScanning(true)}
                      >
                        Scan
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="itemNo">
                  <Form.Label>Item No</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="itemNo"
                    value={formData.itemNo}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="itemName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="itemName"
                    value={formData.itemName}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="enterQty">
                  <Form.Label>Enter Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="enterQty"
                    onChange={handleChange}
                    value={formData.enterQty}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="acceptUnits">
                  <Form.Label>Accept Units</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    name="acceptUnits"
                    value={formData.acceptUnits}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
