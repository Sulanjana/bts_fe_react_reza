import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import TodoCard from "../card/page";
import axios from "axios";

const CheckListPage = () => {
  const [payloadChecklist, setPayloadChecklist] = useState("");
  const [id, setId] = useState("");
  const [payloadItemChecklist, setPayloadItemChecklist] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("authToken");
  const todoCards = [
    {
      title: "Personal To-Do",
      todos: [
        { id: 1, text: "Buy groceries" },
        { id: 2, text: "Walk the dog" },
        { id: 3, text: "Read a book" },
      ],
    },
    {
      title: "Work To-Do",
      todos: [
        { id: 4, text: "Finish project" },
        { id: 5, text: "Email the team" },
        { id: 6, text: "Prepare for meeting" },
      ],
    },
    {
      title: "Shopping To-Do",
      todos: [
        { id: 7, text: "Buy new shoes" },
        { id: 8, text: "Get a new phone case" },
        { id: 9, text: "Check out new laptop" },
      ],
    },
  ];

  const handleCreateChecklist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://94.74.86.174:8080/api/checklist",
        { name: payloadChecklist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {}
  };

  const handleCreateItemChecklist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://94.74.86.174:8080/api/checklist/${id}/item`,
        { itemName: payloadItemChecklist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {}
  };

  const getChecklist = async () => {
    try {
      const response = await axios.get(
        "http://94.74.86.174:8080/api/checklist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getChecklist();
  }, []);
  return (
    <Container className="mt-5">
      <Col>
        <Col md={6} sm={12}>
          <h2 className="text-center">Create Checklist</h2>
          <Form onSubmit={handleCreateChecklist}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={payloadChecklist}
                onChange={(e) => setPayloadChecklist(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create
            </Button>
          </Form>
        </Col>
        <Col md={6} sm={12}>
          <h2 className="text-center">Create Item Checklist</h2>
          <Form onSubmit={handleCreateItemChecklist}>
            <Form.Group controlId="checklistSelect">
              <Form.Label>Checklist</Form.Label>
              <Form.Control
                as="select"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              >
                <option value="">--Select Checklist--</option>
                {data.length > 0 &&
                  data.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={payloadItemChecklist}
                onChange={(e) => setPayloadItemChecklist(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create
            </Button>
          </Form>
        </Col>
        <Row>
          {data.length > 0 &&
            data.map((item, index) => (
              <Col key={index} md={4} className="mb-3">
                <TodoCard title={item.name} todos={item.items} />
              </Col>
            ))}
        </Row>
      </Col>
    </Container>
  );
};

export default CheckListPage;
