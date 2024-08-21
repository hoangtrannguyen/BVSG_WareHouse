import React, { useState } from "react";
import { useAuth } from "../../service/Auth/auth"; // Đảm bảo đường dẫn chính xác
import { Button, Form, Container, Row, Col } from "react-bootstrap"; // Import các thành phần của Bootstrap

function LoginForm() {
  const { loginMutation } = useAuth(); // Destructure loginMutation đúng cách
  const [loginData, setLoginData] = useState({ userName: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMutation) {
      loginMutation.mutate(loginData);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm"
          >
            <h2 className="mb-4 text-center">Login Form</h2>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>User Name:</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={loginData.userName}
                onChange={(e) =>
                  setLoginData({ ...loginData, userName: e.target.value })
                }
                placeholder="Enter your userName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
