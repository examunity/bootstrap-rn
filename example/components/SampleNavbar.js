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

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

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

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{nav2}</Code>
      </View>

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

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{nav3}</Code>
      </View>

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
    </>
  );
}

export default SampleNavbar;
