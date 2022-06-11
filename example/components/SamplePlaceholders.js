import React from 'react';
import {
  Heading,
  Text,
  Code,
  Container,
  Row,
  Col,
  Placeholders,
} from 'bootstrap-rn';

function SamplePlaceholders() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Placeholders</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Placeholders </Text>
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

      <Heading size={2}>Placeholders</Heading>
      <Placeholders>
        <Text>Placeholders</Text>
      </Placeholders>
    </>
  );
}

export default SamplePlaceholders;
