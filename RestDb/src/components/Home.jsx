import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Home = () => {
  const [message] = useState('Benvenuto nel sito Esame Web2!');

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Home - Esame Web2</Card.Title>
          <Card.Text>{message}</Card.Text>
          <Button variant="primary" href="/persone">
            Vai a Persone
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;