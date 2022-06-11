import React from 'react';
import {
  Collapse,
  Heading,
  Text,
  Button,
  Card,
  Container,
  Row,
  Col,
  Code,
  View,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n ' +
  ' <Collapse.Provider>\n ' +
  '   <Button toggle={Collapse}>\n ' +
  '     <Text>Collapse</Text>\n ' +
  '   </Button>\n ' +
  '   <Collapse>\n ' +
  '     <Card>\n ' +
  '       <Card.Body>\n ' +
  '         <Text>Hello, I am collapsible</Text>\n ' +
  '       </Card.Body>\n ' +
  '     </Card>\n ' +
  '   </Collapse>\n ' +
  ' </Collapse.Provider>\n ' +
  '</>';

function SampleCollapse() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Collapse</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Collapse </Text>
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
            <Text />
          </Col>
          <Col size={6}>
            <Text small />
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Collapse</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Collapse.Provider>
              <Button toggle={Collapse}>
                <Text>Collapse</Text>
              </Button>
              <Collapse>
                <Card>
                  <Card.Body>
                    <Text>Hello, I am collapsible</Text>
                  </Card.Body>
                </Card>
              </Collapse>
            </Collapse.Provider>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleCollapse;
