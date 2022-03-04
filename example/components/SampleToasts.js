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
      <Heading size={2}>Toasts</Heading>
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

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Toast and ToastContainer</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Toast </Text>
              <Text color="dark">from </Text>
              <Text color="primary">'bootstrap-rn'</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ToastContainer </Text>
              <Text color="dark">from </Text>
              <Text color="primary">'bootstrap-rn'</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleToasts;
