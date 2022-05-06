import React from 'react';
import {
  Card,
  Heading,
  Text,
  Container,
  Row,
  Col,
  Code,
  View,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n ' +
  ' <Card>\n ' +
  '   <Card.Header>\n ' +
  '     <Text>Card Header Text</Text>\n ' +
  '   </Card.Header>\n ' +
  '   <Card.Body>\n ' +
  '     <Text>Body Text</Text>\n ' +
  '   </Card.Body>\n ' +
  '   <Card.Footer>\n ' +
  '     <Text>Card Footer Text</Text>\n ' +
  '   </Card.Footer>\n ' +
  ' </Card>\n ' +
  '</>';

function SampleCards() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Card</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Card </Text>
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
            <Text></Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text></Text>
          </Col>
          <Col size={6}>
            <Text small></Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Cards</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column ai-center">
            <Card>
              <Card.Header>
                <Text>Card Header Text</Text>
              </Card.Header>
              <Card.Body>
                <Text>Body Text</Text>
              </Card.Body>
              <Card.Footer>
                <Text>Card Footer Text</Text>
              </Card.Footer>
            </Card>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleCards;
