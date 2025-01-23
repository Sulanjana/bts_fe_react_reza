import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://94.74.86.174:8080/api/register",
        payload
      );
      navigate("/login");
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.errorMessage);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} sm={12}>
          <h2 className="text-center">Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={payload.email}
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
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
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Sudah punya akun? <Link to="/login">Login di sini</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
