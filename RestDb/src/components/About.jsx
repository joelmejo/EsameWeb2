import React from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-4">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="border-bottom pb-3">Informazioni su Accademia Rest</Card.Title>
          <Card.Text className="mt-3">
            Questa applicazione è stata sviluppata come progetto per l'esame del modulo Web2. 
            Dimostra l'integrazione delle moderne tecnologie web per creare un'applicazione web full-stack
            con un backend RESTful e un frontend reattivo.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="border-bottom pb-3">Tecnologie Utilizzate</Card.Title>
          
          <Row className="mt-4">
            <Col md={6}>
              <h5><Badge bg="primary">Backend</Badge></h5>
              <ul className="list-unstyled">
                <li>✅ API RESTful con Python Flask</li>
                <li>✅ psycopg (integrazione con PostgreSQL)</li>
                <li>✅ Integrazione con database SQL</li>
                <li>✅ Architettura RESTful</li>
              </ul>
            </Col>
            
            <Col md={6}>
              <h5><Badge bg="success">Frontend</Badge></h5>
              <ul className="list-unstyled">
                <li>✅ Libreria React.js</li>
                <li>✅ Componenti React Bootstrap</li>
                <li>✅ React Router per la navigazione</li>
                <li>✅ Design reattivo</li>
              </ul>
            </Col>
          </Row>
          
          <Card.Text className="mt-3 text-muted">
            L'applicazione dimostra l'implementazione pratica dei concetti appresi durante il corso Web2,
            inclusi lo sviluppo di API REST, l'integrazione con database e i moderni framework frontend.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;