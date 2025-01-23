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
      setPayloadChecklist("");
      getChecklist();
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
      setPayloadItemChecklist("");
      getChecklist();
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
      <Row>
        <Col md={6} sm={12}>
          <h2 className="text-center">Create Checklist</h2>
          <Form onSubmit={handleCreateChecklist}>
            <Form.Group controlId="formBasicName">
              <Form.Label className="mt-3">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={payloadChecklist}
                onChange={(e) => setPayloadChecklist(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Create
            </Button>
          </Form>
        </Col>
        <Col md={6} sm={12}>
          <h2 className="text-center">Create Item Checklist</h2>
          <Form onSubmit={handleCreateItemChecklist}>
            <Form.Group controlId="checklistSelect">
              <Form.Label className="mt-3">Checklist</Form.Label>
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
      </Row>
      <Row className="mt-5">
        {data.length > 0 &&
          data.map((item, index) => (
            <Col key={index} md={4} className="mb-3">
              <TodoCard title={item.name} checklistId={item.id} checklists={item.items ?? []} func={getChecklist} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default CheckListPage;
