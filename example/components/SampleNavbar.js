import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Heading,
  Text,
  Offcanvas,
  CloseButton,
} from 'bootstrap-rn';

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
              <Nav.Link active>
                <Text>Home</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Features</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Pricing</Text>
              </Nav.Link>
              <Nav.Link disabled>
                <Text>Disabled</Text>
              </Nav.Link>
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
              <Nav.Link active>
                <Text>Home</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Features</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Pricing</Text>
              </Nav.Link>
              <Nav.Link disabled>
                <Text>Disabled</Text>
              </Nav.Link>
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
                <Nav.Link active>
                  <Text>Home</Text>
                </Nav.Link>
                <Nav.Link>
                  <Text>Features</Text>
                </Nav.Link>
                <Nav.Link>
                  <Text>Pricing</Text>
                </Nav.Link>
                <Nav.Link disabled>
                  <Text>Disabled</Text>
                </Nav.Link>
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
