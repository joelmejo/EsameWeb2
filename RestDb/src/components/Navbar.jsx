import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar data-bs-theme="dark" bg="primary" expand="lg">
      <Container>
      <Navbar.Brand><img src="logo-its.png" alt="" width="70"/></Navbar.Brand>
        <Navbar.Brand as={Link} to="/">Accademia Rest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/persone">Persone</Nav.Link>
            <Nav.Link as={Link} to="/progetti">Progetti</Nav.Link>
            <Nav.Link as={Link} to="/wps">Wps</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;