import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useMutation } from "react-query";
import { updateUser } from "../../service/Data/getUserData";
import MasterDataDisplay from "../../container/Role/Role.jsx";

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
  const [features, setFeatures] = useState(initialValues?.features || []);

  useEffect(() => {
    if (initialValues) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...initialValues,
      }));
      setSelectedRoles(initialValues.roles || []);
      setFeatures(initialValues.features || []);
    }
  }, [initialValues]);

  const mutation = useMutation(
    (data) => (isEditing ? updateUser(userId, data) : mutationFn(data)),
    {
      onSuccess: () => {
        refetch();
        handleReset();
        handleClose();
      },
      onError: (error) => {
        console.error(
          "Lỗi khi xử lý yêu cầu:",
          error.response ? error.response.data : error.message
        );
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      roles: selectedRoles,
      features,
    };

    if (isEditing) {
      const { password, confirmPassword, ...updatedData } = dataToSend;
      mutation.mutate(updatedData);
    } else {
      mutation.mutate(dataToSend);
    }
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

  const handleFeaturesChange = (newFeatures) => {
    setFeatures(newFeatures);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSelectedRoles(initialFormData.roles);
    setFeatures(initialValues?.features || []);
  };

  const closeModal = () => {
    handleReset();
    handleClose();
  };

  return (
    <Modal show={show} onHide={closeModal} className="modal-small">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            {fields.map((field, index) => {
              if (field.key === "lockoutEnabled") {
                return null;
              }

              if (field.key === "status") {
                return (
                  <Col xs={12} md={6} className="mb-3" key={index}>
                    <Form.Group className="form-group">
                      <Form.Label className="label-left">Trạng thái</Form.Label>
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

            <Col xs={12} className="mb-3">
              <hr />

              <MasterDataDisplay
                initialFeatures={formData.features}
                onFeaturesChange={handleFeaturesChange}
              />
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={mutation.isLoading}>
            {mutation.isLoading
              ? "Đang lưu..."
              : isEditing
              ? "Lưu thay đổi"
              : "Thêm người dùng"}
          </Button>
        </Form>
        {mutation.isError && (
          <p className="mt-3 text-danger">Lỗi: {mutation.error.message}</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
