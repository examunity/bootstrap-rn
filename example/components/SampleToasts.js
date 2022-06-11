import React from 'react';
import {
  ToastContainer,
  Toast,
  Heading,
  Text,
  Container,
  Row,
  Col,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Toast styleName="mb-3">\n' +
  '<Toast.Header>\n' +
  '  <Text bold>Heading</Text>\n' +
  '</Toast.Header>\n' +
  '<Toast.Body>\n' +
  '  <Text>Body</Text>\n' +
  '</Toast.Body>\n' +
  '</Toast>\n' +
  '<ToastContainer>\n' +
  '<Toast>\n' +
  '  <Toast.Header>\n' +
  '    <Text bold>Heading</Text>\n' +
  '  </Toast.Header>\n' +
  '  <Toast.Body>\n' +
  '    <Text>Body</Text>\n' +
  '  </Toast.Body>\n' +
  '</Toast>\n' +
  '<Toast>\n' +
  '  <Toast.Header>\n' +
  '    <Text bold>Heading</Text>\n' +
  '  </Toast.Header>\n' +
  '  <Toast.Body>\n' +
  '    <Text>Body</Text>\n' +
  '  </Toast.Body>\n' +
  '</Toast>\n' +
  '</ToastContainer>\n' +
  '</>';

function SampleToasts() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Toast and ToastContainer</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Toast </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ToastContainer </Text>
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
          <Heading size={5}>Toasts</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Toast styleName="mb-3">
              <Toast.Header>
                <Text bold>Heading</Text>
              </Toast.Header>
              <Toast.Body>
                <Text>Body</Text>
              </Toast.Body>
            </Toast>
            <ToastContainer>
              <Toast>
                <Toast.Header>
                  <Text bold>Heading</Text>
                </Toast.Header>
                <Toast.Body>
                  <Text>Body</Text>
                </Toast.Body>
              </Toast>
              <Toast>
                <Toast.Header>
                  <Text bold>Heading</Text>
                </Toast.Header>
                <Toast.Body>
                  <Text>Body</Text>
                </Toast.Body>
              </Toast>
            </ToastContainer>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleToasts;
