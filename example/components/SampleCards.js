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
      <Heading size={2}>Cards</Heading>
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

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Card</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Card </Text>
              <Text color="dark">from </Text>
              <Text color="primary">'bootstrap-rn'</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleCards;
