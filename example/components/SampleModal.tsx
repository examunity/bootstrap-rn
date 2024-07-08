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
  Card,
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
            <Text>size</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.oneOf(MODAL_SIZES)</Text>
          </Col>
        </Row>

        <Row styleName="bg-info">
          <Col size={6}>
            <Text>backdrop</Text>
          </Col>
          <Col size={6}>
            <Text small>
              PropTypes.oneOfType([PropTypes.bool,
              PropTypes.oneOf([&apos;static&apos;])
            </Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>onToggle</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.func.isRequired</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Modal
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Button onPress={() => setModalVisible(true)}>
              <Text>Show Modal</Text>
            </Button>

            <Modal
              visible={modalVisible}
              onToggle={() => setModalVisible((value) => !value)}
            >
              <Modal.Header>
                <Modal.Title>Modal Title Text</Modal.Title>
                <CloseButton
                  onPress={() => setModalVisible((value) => !value)}
                />
              </Modal.Header>
              <Modal.Body>
                <Text>Woo-hoo, you&apos;re reading this text in a modal!</Text>
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleModal;
