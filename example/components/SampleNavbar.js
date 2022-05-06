import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Code,
  Heading,
  Text,
  Offcanvas,
  CloseButton,
  View,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Navbar expand="lg" styleName="bg-light">\n' +
  '<Container fluid>\n' +
  '  <Navbar.Brand>\n' +
  '    <Text>Navbar</Text>\n' +
  '  </Navbar.Brand>\n' +
  '  <Navbar.Toggler />\n' +
  '  <Navbar.Collapse>\n' +
  '    <Nav>\n' +
  '      <Nav.Link active>\n' +
  '        <Text>Home</Text>\n' +
  '      </Nav.Link>\n' +
  '      <Nav.Link>\n' +
  '        <Text>Features</Text>\n' +
  '      </Nav.Link>\n' +
  '      <Nav.Link>\n' +
  '        <Text>Pricing</Text>\n' +
  '      </Nav.Link>\n' +
  '      <Nav.Link disabled>\n' +
  '        <Text>Disabled</Text>\n' +
  '      </Nav.Link>\n' +
  '    </Nav>\n' +
  '   <Navbar.Text>Test</Navbar.Text>\n' +
  '  </Navbar.Collapse>\n' +
  '</Container>\n' +
  '</Navbar>\n' +
  '</>';

const nav2 =
  '<>\n' +
  '<Navbar variant="dark" styleName="bg-primary">\n' +
  '<Container fluid>\n' +
  '  <Navbar.Brand>\n' +
  '    <Text>Navbar</Text>\n' +
  '  </Navbar.Brand>\n' +
  '  <Navbar.Toggler />\n' +
  '  <Navbar.Collapse>\n' +
  '    <Nav>\n' +
  '      <Nav.Link active>\n' +
  '        <Text>Home</Text>\n' +
  '      </Nav.Link>\n' +
  '      <Nav.Link>\n' +
  '        <Text>Features</Text>\n' +
  '      </Nav.Link>\n' +
  '      <Nav.Link>\n' +
  '        <Text>Pricing</Text>\n' +
  '      </Nav.Link>\n' +
  '      <Nav.Link disabled>\n' +
  '        <Text>Disabled</Text>\n' +
  '      </Nav.Link>\n' +
  '    </Nav>\n' +
  '    <Navbar.Text>Test</Navbar.Text>\n' +
  '  </Navbar.Collapse>\n' +
  '</Container>\n' +
  '</Navbar>\n' +
  '</>';

const nav3 =
  '<>\n' +
  '<Navbar styleName="bg-light">\n' +
  '<Container fluid>\n' +
  '  <Navbar.Brand>\n' +
  '    <Text>Navbar</Text>\n' +
  '  </Navbar.Brand>\n' +
  '  <Navbar.Toggler />\n' +
  '  <Offcanvas placement="end">\n' +
  '    <Offcanvas.Header>\n' +
  '       <Offcanvas.Title>Offcanvas</Offcanvas.Title>\n' +
  '      <CloseButton dismiss={Navbar} />\n' +
  '    </Offcanvas.Header>\n' +
  '    <Offcanvas.Body>\n' +
  '      <Nav>\n' +
  '        <Nav.Link active>\n' +
  '          <Text>Home</Text>\n' +
  '        </Nav.Link>\n' +
  '        <Nav.Link>\n' +
  '          <Text>Features</Text>\n' +
  '        </Nav.Link>\n' +
  '        <Nav.Link>\n' +
  '          <Text>Pricing</Text>\n' +
  '        </Nav.Link>\n' +
  '        <Nav.Link disabled>\n' +
  '          <Text>Disabled</Text>\n' +
  '        </Nav.Link>\n' +
  '      </Nav>\n' +
  '       <Navbar.Text>Test</Navbar.Text>\n' +
  '    </Offcanvas.Body>\n' +
  '  </Offcanvas>\n' +
  '</Container>\n' +
  '</Navbar>\n' +
  '</>';

function SampleNavbar() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Navbar</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Navbar </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>
      {/* PROPS -----------------------------------------------------  */}
      <Container styleName="mb-5">
        <Row styleName="bg-secondary">
          <Col size={6}>
            <Text>Propname</Text>
          </Col>
          <Col size={6}>
            <Text>Value</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>defaultExpanded</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>

        <Row styleName="bg-info">
          <Col size={6}>
            <Text>expanded</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>onToggle</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.func</Text>
          </Col>
        </Row>

        <Row styleName="bg-info">
          <Col size={6}>
            <Text>expand</Text>
          </Col>
          <Col size={6}>
            <Text small>sm | md | lg | xl | xxl</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Navbar</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Navbar collapsed</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{nav2}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Navbar canvas</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{nav3}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleNavbar;
