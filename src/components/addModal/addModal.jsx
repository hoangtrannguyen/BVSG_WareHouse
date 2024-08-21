import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useMutation } from "react-query";
import { updateUser } from "../../service/Data/getUserData.jsx";
import "./addModal.css";

const AddModal = ({
  show,
  handleClose,
  refetch,
  fields,
  mutationFn,
  initialValues,
  isEditing,
  userId,
}) => {
  const initialFormData = fields.reduce((acc, field) => {
    acc[field.key] =
      initialValues && initialValues[field.key] !== undefined
        ? initialValues[field.key]
        : field.type === "number"
        ? 0
        : field.key === "roles"
        ? []
        : field.key === "lockoutEnabled"
        ? false
        : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [selectedRoles, setSelectedRoles] = useState(initialFormData.roles);

  useEffect(() => {
    if (initialValues) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...initialValues,
      }));
      setSelectedRoles(initialValues.roles || []);
    }
  }, [initialValues]);

  const mutation = useMutation(
    (data) => (isEditing ? updateUser(userId, data) : mutationFn(data)),
    {
      onSuccess: () => {
        refetch();
        handleReset();
        handleClose(); // Close the modal and reset form data
      },
      onError: (error) => {
        console.error(
          "Error handling request:",
          error.response ? error.response.data : error.message
        );
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...formData, roles: selectedRoles });
  };

  const handleChange = (e, key) => {
    const value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setSelectedRoles((prevRoles) =>
      checked
        ? [...prevRoles, value]
        : prevRoles.filter((role) => role !== value)
    );
  };

  const handleSwitchChange = () => {
    setFormData({ ...formData, lockoutEnabled: !formData.lockoutEnabled });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSelectedRoles(initialFormData.roles);
  };

  const closeModal = () => {
    handleReset();
    handleClose();
  };

  return (
    <Modal show={show} onHide={closeModal} className="modal-small">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            {fields.map((field, index) => {
              if (field.key === "lockoutEnabled") {
                return null;
              }

              if (field.key === "roles") {
                return (
                  <Col xs={12} key={index} className="mb-3">
                    <Form.Group className="form-group">
                      <Form.Label className="label-left">
                        {field.label}
                      </Form.Label>
                      <Row>
                        {field.options.map((option) => (
                          <Row xs={12} key={option.value} className="mb-2">
                            <Form.Check
                              type="checkbox"
                              id={`role-${option.value}`}
                              label={option.label}
                              value={option.value}
                              checked={selectedRoles.includes(option.value)}
                              onChange={handleRoleChange}
                            />
                          </Row>
                        ))}
                      </Row>
                    </Form.Group>
                  </Col>
                );
              }

              return (
                <Col xs={12} md={6} key={index} className="mb-3">
                  <Row>
                    <Col xs={2}>
                      <Form.Group className="form-group">
                        <Form.Label className="label-left">
                          {field.label}
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col xs={10}>
                      <Form.Group className="form-group">
                        <Form.Control
                          type={field.type}
                          value={formData[field.key] || ""}
                          onChange={(e) => handleChange(e, field.key)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              );
            })}
            <Col xs={12} md={6} className="mb-3">
              <Form.Group className="form-group">
                <Form.Label className="label-left">Status</Form.Label>
                <Form.Check
                  type="switch"
                  id="lockoutEnabled-switch"
                  label={
                    formData.lockoutEnabled
                      ? "Không hoạt động"
                      : "Đang hoạt động"
                  }
                  checked={formData.lockoutEnabled}
                  onChange={handleSwitchChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={mutation.isLoading}>
            {mutation.isLoading
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Add User"}
          </Button>
        </Form>
        {mutation.isError && (
          <p className="mt-3 text-danger">Error: {mutation.error.message}</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
