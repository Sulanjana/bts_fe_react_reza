import axios from "axios";
import React from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";

const TodoCard = ({ title, checklistId, checklists, func }) => {
  const token = localStorage.getItem("authToken");
  const handleCheckboxChange = async (itemId) => {
    try {
      const response = await axios.put(
        `http://94.74.86.174:8080/api/checklist/${checklistId}/item/${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      func()
      console.log(response);
    } catch (error) {}
  };

  return (
    <Card style={{ backgroundColor: "aliceblue" }} className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ListGroup>
          {checklists.map((todo) => (
            <ListGroupItem key={todo.id}>
              <Form.Check
                type="checkbox"
                label={todo.name}
                checked={todo.itemCompletionStatus}
                onChange={() => handleCheckboxChange(todo.id)}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default TodoCard;
