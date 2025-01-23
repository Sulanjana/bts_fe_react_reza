import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Form } from 'react-bootstrap';

// Fungsi untuk menghasilkan warna acak
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TodoCard = ({ title, todos }) => {
  // State untuk menyimpan status checklist tiap item
  const [checkedItems, setCheckedItems] = useState(
    todos.reduce((acc, todo) => {
      acc[todo.id] = false;
      return acc;
    }, {})
  );

  // Fungsi untuk menangani perubahan status checklist
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  return (
    <Card style={{ backgroundColor: getRandomColor() }} className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ListGroup>
          {todos.map((todo) => (
            <ListGroupItem key={todo.id}>
              <Form.Check
                type="checkbox"
                label={todo.name}
                checked={checkedItems[todo.id]}
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
