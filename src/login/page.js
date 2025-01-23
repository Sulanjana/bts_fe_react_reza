import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://94.74.86.174:8080/api/login",
        payload
      );
      localStorage.setItem("authToken", response.data.data.token);
    } catch (error) {}
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} sm={12}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={payload.username}
                onChange={(e) =>
                  setPayload({ ...payload, username: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={payload.password}
                onChange={(e) =>
                  setPayload({ ...payload, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Belum punya akun? <Link to="/register">Daftar di sini</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
