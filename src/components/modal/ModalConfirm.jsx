import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import QRScanner from "../QRScan/QrScan";
import "./modalConfirm.css";

const ConfirmModal = ({ show, onHide, item, onConfirm }) => {
  const [formData, setFormData] = useState({
    shelfCode: "",
    acceptType: "",
    acceptNo: "",
    acceptSeq: "",
    productId: "",
    productName: "",
    quantity: "",
    unit: "",
  });
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        acceptType: item.acceptType || "",
        acceptNo: item.acceptNo || "",
        acceptSeq: item.acceptSeq || "",
        productId: item.itemNo || "",
        productName: item.itemName || "",
        quantity: item.enterQty || "",
        unit: item.acceptUnits || "",
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
    setFormData((prevData) => ({ ...prevData, shelfCode: data }));
    setIsScanning(false);
  };

  const handleCloseModal = () => {
    setIsScanning(false);
    setFormData((prevData) => ({ ...prevData, shelfCode: "" }));
    onHide();
  };

  const handleCloseScanner = () => {
    setIsScanning(false);
    setFormData((prevData) => ({ ...prevData, shelfCode: "" }));
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
                      value={formData.shelfCode}
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
                    value={formData.productId}
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
                    value={formData.productName}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="enterQty">
                  <Form.Label>Enter Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    size="lg"
                    name="quantity"
                    onChange={handleChange}
                    value={formData.quantity}
                    min="0" // Ensures only positive numbers
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
                    value={formData.unit}
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
