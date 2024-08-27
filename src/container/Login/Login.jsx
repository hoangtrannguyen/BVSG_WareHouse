import React, { useState } from "react";
import { useAuth } from "../../service/Auth/auth"; // Ensure the path is correct
import { Button, Form, Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components

function LoginForm() {
  const { loginMutation } = useAuth(); // Destructure loginMutation
  const [loginData, setLoginData] = useState({ userName: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMutation) {
      loginMutation.mutate(loginData);
    }
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/img/img3.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          opacity: 0.9,
          filter: "brightness(0.4)",
        }}
      ></div>

      <Container className="d-flex justify-content-start align-items-center vh-100  flex-column mt-5 ">
        <img
          src="/img/logo.png"
          alt="Logo"
          style={{ maxWidth: "300px" }}
          className="my-5"
        />
        <Row className="w-100 mt-5">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Form
              onSubmit={handleSubmit}
              className="border p-4 rounded shadow-sm"
            >
              <h1
                className="mb-4 text-center"
                style={{
                  color: "white",
                }}
              >
                Login Form
              </h1>
              <Form.Group
                className="mb-3"
                controlId="userName"
                style={{
                  color: "white",
                }}
              >
                <Form.Label className=" mb-1">User Name:</Form.Label>

                <Form.Control
                  type="text"
                  name="userName"
                  value={loginData.userName}
                  onChange={(e) =>
                    setLoginData({ ...loginData, userName: e.target.value })
                  }
                  className="m-0"
                  placeholder="Enter your userName"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="password"
                style={{
                  color: "white",
                }}
              >
                <Form.Label className=" mb-1"> Password:</Form.Label>

                <Form.Control
                  type="password"
                  name="password"
                  value={loginData.password}
                  className="m-0"
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
    </>
  );
}

export default LoginForm;
