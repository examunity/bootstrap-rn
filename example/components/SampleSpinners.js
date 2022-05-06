import React from 'react';
import {
  Spinner,
  Heading,
  Text,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const cardmargin = 'mb-3';

function SampleSpinners() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Spinners</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Spinner </Text>
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
            <Text>color</Text>
          </Col>
          <Col size={6}>
            <Text small>
              primary | secondary | success | danger | warning | info | light |
              dark
            </Text>
          </Col>
        </Row>
        <Row styleName="bg-info">
          <Col size={6}>
            <Text>size</Text>
          </Col>
          <Col size={6}>
            <Text small>sm</Text>
          </Col>
        </Row>
        <Row>
          <Col size={6}>
            <Text>variant</Text>
          </Col>
          <Col size={6}>
            <Text small>border | grow</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Border spinner</Heading>
        </Card.Header>
        <Card.Body styleName="flex-row">
          <Spinner />
          <Spinner color="primary" />
          <Spinner color="secondary" />
          <Spinner color="success" />
          <Spinner color="danger" />
          <Spinner color="warning" />
          <Spinner color="info" />
          <Spinner color="light" />
          <Spinner color="dark" />
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Spinner />\n' +
              '<Spinner color="primary" />\n' +
              '<Spinner color="secondary" />\n' +
              '<Spinner color="success" />\n' +
              '<Spinner color="danger" />\n' +
              '<Spinner color="warning" />\n' +
              '<Spinner color="info" />\n' +
              '<Spinner color="light" />\n' +
              '<Spinner color="dark" />'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Growing spinner</Heading>
        </Card.Header>
        <Card.Body styleName="flex-row">
          <Spinner variant="grow" />
          <Spinner variant="grow" color="primary" />
          <Spinner variant="grow" color="secondary" />
          <Spinner variant="grow" color="success" />
          <Spinner variant="grow" color="danger" />
          <Spinner variant="grow" color="warning" />
          <Spinner variant="grow" color="info" />
          <Spinner variant="grow" color="light" />
          <Spinner variant="grow" color="dark" />
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Spinner variant="grow" />\n' +
              '<Spinner variant="grow" color="primary" />\n' +
              '<Spinner variant="grow" color="secondary" />\n' +
              '<Spinner variant="grow" color="success" />\n' +
              '<Spinner variant="grow" color="danger" />\n' +
              '<Spinner variant="grow" color="warning" />\n' +
              '<Spinner variant="grow" color="info" />\n' +
              '<Spinner variant="grow" color="light" />\n' +
              '<Spinner variant="grow" color="dark" />'}
          </Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleSpinners;
