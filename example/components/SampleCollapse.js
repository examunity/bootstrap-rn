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
      <Heading size={2}>Collapse</Heading>
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

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

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
    </>
  );
}

export default SampleCollapse;
