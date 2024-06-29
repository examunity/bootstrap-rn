import React from 'react';
import {
  Nav,
  Tab,
  Text,
  Badge,
  Paragraph,
  Heading,
  Container,
  Row,
  Col,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const navVariantTabs =
  '<>\n' +
  '<Nav variant="tabs" styleName="mb-3">\n' +
  ' <Nav.Link>\n' +
  '  <Text>Ron</Text>\n' +
  ' </Nav.Link>\n' +
  ' <Nav.Link>\n' +
  '  <Text>Patrik</Text>\n' +
  ' </Nav.Link>\n' +
  ' <Nav.Link>\n' +
  '  <Text>Anton</Text>\n' +
  ' </Nav.Link>\n' +
  ' <Nav.Link>\n' +
  '  <Text>Markus</Text>\n' +
  ' </Nav.Link>\n' +
  ' <Nav.Link active>\n' +
  '  <Text>active</Text>\n' +
  ' </Nav.Link>\n' +
  ' <Nav.Link disabled>\n' +
  '  <Text>disabled</Text>\n' +
  ' </Nav.Link>\n' +
  '</Nav>\n' +
  '</>';

const navVariantPills =
  '<>\n' +
  '<Nav variant="pills" styleName="mb-3">\n' +
  '<Nav.Link>\n' +
  '  <Text>Ron</Text>\n' +
  '</Nav.Link>\n' +
  '<Nav.Link>\n' +
  '  <Text>Patrik</Text>\n' +
  '</Nav.Link>\n' +
  '<Nav.Link>\n' +
  '  <Text>Anton</Text>\n' +
  '</Nav.Link>\n' +
  '<Nav.Link>\n' +
  '  <Text>Markus</Text>\n' +
  '</Nav.Link>\n' +
  '<Nav.Link active>\n' +
  '  <Text>active</Text>\n' +
  '</Nav.Link>\n' +
  '<Nav.Link disabled>\n' +
  '  <Text>disabled</Text>\n' +
  '</Nav.Link>\n' +
  '</Nav>\n' +
  '</>';

const tab =
  '<>\n' +
  '<Nav variant="pills" styleName="mb-3">\n' +
  '<Tab.Provider defaultActiveTarget="pane-1">\n' +
  '<Nav variant="tabs">\n' +
  '  <Nav.Link toggle={Tab} target="pane-1">\n' +
  '    <Text>Page 1</Text>\n' +
  '  </Nav.Link>\n' +
  '  <Nav.Link toggle={Tab} target="pane-2">\n' +
  '    <Text>Page 2</Text>\n' +
  '    <Badge styleName="bg-secondary ml-2">\n' +
  '      <Text>8</Text>\n' +
  '    </Badge>\n' +
  '  </Nav.Link>\n' +
  '  <Nav.Link toggle={Tab} target="pane-3">\n' +
  '    <Text>Page 3</Text>\n' +
  '  </Nav.Link>\n' +
  '</Nav>\n\n' +
  '<Tab.Content styleName="p-3">\n' +
  '  <Tab.Pane id="pane-1">\n' +
  '    <Paragraph>Page Content 1</Paragraph>\n' +
  '  </Tab.Pane>\n' +
  '  <Tab.Pane id="pane-2">\n' +
  '    <Paragraph>Page Content 2</Paragraph>\n' +
  '  </Tab.Pane>\n' +
  '  <Tab.Pane id="pane-3">\n' +
  '    <Paragraph>Page Content 3</Paragraph>\n' +
  '   </Tab.Pane>\n' +
  '</Tab.Content>\n' +
  '</Tab.Provider>\n' +
  '</>';

function SampleNav() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Nav, Tab</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Nav </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Tab </Text>
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
            <Text>variant</Text>
          </Col>
          <Col size={6}>
            <Text small>tabs | pills</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Nav Tabs
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Nav variant="tabs" styleName="mb-3">
              <Nav.Link>
                <Text>Ron</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Patrik</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Anton</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Markus</Text>
              </Nav.Link>
              <Nav.Link active>
                <Text>active</Text>
              </Nav.Link>
              <Nav.Link disabled>
                <Text>disabled</Text>
              </Nav.Link>
            </Nav>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{navVariantTabs}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Nav pills
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Nav variant="pills" styleName="mb-3">
              <Nav.Link>
                <Text>Ron</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Patrik</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Anton</Text>
              </Nav.Link>
              <Nav.Link>
                <Text>Markus</Text>
              </Nav.Link>
              <Nav.Link active>
                <Text>active</Text>
              </Nav.Link>
              <Nav.Link disabled>
                <Text>disabled</Text>
              </Nav.Link>
            </Nav>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{navVariantPills}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Nav tab content
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Tab.Provider defaultActiveTarget="pane-1">
              <Nav variant="tabs">
                <Nav.Link toggle={Tab} target="pane-1">
                  <Text>Page 1</Text>
                </Nav.Link>
                <Nav.Link toggle={Tab} target="pane-2">
                  <Text>Page 2</Text>
                  <Badge styleName="bg-secondary ml-2">
                    <Text>8</Text>
                  </Badge>
                </Nav.Link>
                <Nav.Link toggle={Tab} target="pane-3">
                  <Text>Page 3</Text>
                </Nav.Link>
              </Nav>

              <Tab.Content styleName="p-3">
                <Tab.Pane id="pane-1">
                  <Paragraph>Page Content 1</Paragraph>
                </Tab.Pane>
                <Tab.Pane id="pane-2">
                  <Paragraph>Page Content 2</Paragraph>
                </Tab.Pane>
                <Tab.Pane id="pane-3">
                  <Paragraph>Page Content 3</Paragraph>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Provider>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{tab}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleNav;
