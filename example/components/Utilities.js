import React from 'react';
import {
  Heading,
  Text,
  Code,
  View,
  Container,
  Row,
  Col,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Text styleName="bg-primary opacity-50 text-danger lh-base p-3">\n' +
  'Anton\n' +
  '</Text>\n' +
  '<Text styleName="text-success m-n3">Patrik</Text>\n' +
  '</>';

function Utilities() {
  return (
    <>
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
            <Text>color</Text>
          </Col>
          <Col size={6}>
            <Text small>
              primary | secondary | success | danger | warning | info | light |
              dark
            </Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Utilities
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Text styleName="bg-primary opacity-50 text-danger lh-base p-3">
              Anton
            </Text>
            <Text styleName="text-success m-n3">Patrik</Text>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
      <Heading size={2} />
    </>
  );
}

export default Utilities;
