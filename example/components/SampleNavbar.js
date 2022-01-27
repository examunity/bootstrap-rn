import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Heading,
  Text,
  Offcanvas,
  CloseButton,
} from 'bootstyle';

function SampleNavbar() {
  return (
    <>
      <Heading size={2}>Navbar</Heading>
      <Navbar expand="lg" styleName="bg-light">
        <Container fluid>
          <Navbar.Brand>
            <Text>Navbar</Text>
          </Navbar.Brand>
          <Navbar.Toggler />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link active>Home</Nav.Link>
              <Nav.Link>Features</Nav.Link>
              <Nav.Link>Pricing</Nav.Link>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav>
            <Navbar.Text>Test</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar variant="dark" styleName="bg-primary">
        <Container fluid>
          <Navbar.Brand>
            <Text>Navbar</Text>
          </Navbar.Brand>
          <Navbar.Toggler />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link active>Home</Nav.Link>
              <Nav.Link>Features</Nav.Link>
              <Nav.Link>Pricing</Nav.Link>
              <Nav.Link disabled>Disabled</Nav.Link>
            </Nav>
            <Navbar.Text>Test</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar styleName="bg-light">
        <Container fluid>
          <Navbar.Brand>
            <Text>Navbar</Text>
          </Navbar.Brand>
          <Navbar.Toggler />
          <Offcanvas placement="end">
            <Offcanvas.Header>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              <CloseButton dismiss={Navbar} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link active>Home</Nav.Link>
                <Nav.Link>Features</Nav.Link>
                <Nav.Link>Pricing</Nav.Link>
                <Nav.Link disabled>Disabled</Nav.Link>
              </Nav>
              <Navbar.Text>Test</Navbar.Text>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default SampleNavbar;
