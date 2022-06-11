import React, { useState } from 'react';
import {
  Offcanvas,
  Heading,
  Text,
  Button,
  CloseButton,
  View,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Button\n' +
  'onPress={() => {\n' +
  '  setOffcanvasVisible(true);\n' +
  '  setOffcanvasPlacement("top");\n' +
  '}}\n' +
  '>\n' +
  '<Text>Show Offcanvas Top</Text>\n' +
  '</Button>\n' +
  '//setOffcanvasPlacement("bottom"); \n' +
  '//setOffcanvasPlacement("start"); \n' +
  '//setOffcanvasPlacement("end"); \n' +
  '\n' +
  '<Offcanvas\n' +
  'visible={offcanvasVisible}\n' +
  'placement={offcanvasPlacement}\n' +
  'onToggle={() => setOffcanvasVisible((value) => !value)}\n' +
  '>\n' +
  '<Offcanvas.Header>\n' +
  '  <Offcanvas.Title>Offcanvas Title Text</Offcanvas.Title>\n' +
  '  <CloseButton onPress={() => setOffcanvasVisible((value) => !value)} />\n' +
  '</Offcanvas.Header>\n' +
  '<Offcanvas.Body>\n' +
  '  <Text>\n' +
  '    Lorem Ipsum is simply dummy text of the printing and typesetting\n' +
  '   industry. Lorem Ipsum has ...\n' +
  '  </Text>\n' +
  '  <View>\n' +
  '    <Button onPress={() => setOffcanvasVisible((value) => !value)}>\n' +
  '      <Text>Close</Text>\n' +
  '    </Button>\n' +
  '  </View>\n' +
  '</Offcanvas.Body>\n' +
  '</Offcanvas>\n' +
  '</>';

function SampleOffcanvas() {
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [offcanvasPlacement, setOffcanvasPlacement] = useState('top');

  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Offcanvas</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Offcanvas </Text>
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
            <Text>placement</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.oneOf(PLACEMENTS)</Text>
          </Col>
        </Row>

        <Row styleName="bg-info">
          <Col size={6}>
            <Text>backdrop</Text>
          </Col>
          <Col size={6}>
            <Text small>
              PropTypes.oneOfType([PropTypes.bool,
              PropTypes.oneOf([&apos;static&apos;])])
            </Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>onToggle</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.func</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Offcanvas</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Button
              onPress={() => {
                setOffcanvasVisible(true);
                setOffcanvasPlacement('top');
              }}
            >
              <Text>Show Offcanvas Top</Text>
            </Button>

            <Button
              onPress={() => {
                setOffcanvasVisible(true);
                setOffcanvasPlacement('bottom');
              }}
            >
              <Text>Show Offcanvas Bottom</Text>
            </Button>

            <Button
              onPress={() => {
                setOffcanvasVisible(true);
                setOffcanvasPlacement('start');
              }}
            >
              <Text>Show Offcanvas Left</Text>
            </Button>

            <Button
              onPress={() => {
                setOffcanvasVisible(true);
                setOffcanvasPlacement('end');
              }}
            >
              <Text>Show Offcanvas Right</Text>
            </Button>

            <Offcanvas
              visible={offcanvasVisible}
              placement={offcanvasPlacement}
              onToggle={() => setOffcanvasVisible((value) => !value)}
            >
              <Offcanvas.Header>
                <Offcanvas.Title>Offcanvas Title Text</Offcanvas.Title>
                <CloseButton
                  onPress={() => setOffcanvasVisible((value) => !value)}
                />
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum
                </Text>
                <View>
                  <Button
                    onPress={() => setOffcanvasVisible((value) => !value)}
                  >
                    <Text>Close</Text>
                  </Button>
                </View>
              </Offcanvas.Body>
            </Offcanvas>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleOffcanvas;
