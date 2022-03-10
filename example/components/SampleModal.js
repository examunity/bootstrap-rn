import React, { useState } from 'react';
import {
  Modal,
  Heading,
  Text,
  Button,
  CloseButton,
  Container,
  Row,
  Col,
  Code,
  View,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Modal\n' +
  'visible={modalVisible}\n' +
  'onToggle={() => setModalVisible((value) => !value)}\n' +
  'size="xl"\n' +
  '>\n' +
  '<Modal.Header>\n' +
  '  <Modal.Title>Modal Title Text</Modal.Title>\n' +
  '  <CloseButton onPress={() => setModalVisible((value) => !value)} />\n' +
  '</Modal.Header>\n' +
  '<Modal.Body>\n' +
  '  <Text>\n' +
  '    Lorem Ipsum is simply ... \n' +
  '  </Text>\n' +
  '</Modal.Body>\n' +
  '<Modal.Footer>\n' +
  '  <Button onPress={() => setModalVisible((value) => !value)}>\n' +
  '    <Text>Submit</Text>\n' +
  '  </Button>\n' +
  ' <Button onPress={() => setModalVisible(!modalVisible)}>\n' +
  '    <Text>Close</Text>\n' +
  '  </Button>\n' +
  '</Modal.Footer>\n' +
  '</Modal>\n' +
  '</>';

function SampleModal() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Heading size={2}>Modal</Heading>
      <Button onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Button>

      <Modal
        visible={modalVisible}
        onToggle={() => setModalVisible((value) => !value)}
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Modal Title Text</Modal.Title>
          <CloseButton onPress={() => setModalVisible((value) => !value)} />
        </Modal.Header>
        <Modal.Body>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={() => setModalVisible((value) => !value)}>
            <Text>Submit</Text>
          </Button>
          <Button onPress={() => setModalVisible(!modalVisible)}>
            <Text>Close</Text>
          </Button>
        </Modal.Footer>
      </Modal>

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Modal</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Modal </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleModal;
