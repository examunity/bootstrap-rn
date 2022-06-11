import React from 'react';
import {
  Alert,
  Heading,
  Text,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const cardmargin = 'mb-3';

function SampleAlerts() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Alert</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Alert </Text>
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
            <Text>dismissible</Text>
          </Col>
          <Col size={6} />
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Alerts</Heading>
        </Card.Header>
        <Card.Body>
          <Alert color="primary">
            <Text>This is a primary alert—check it out!</Text>
          </Alert>
          <Alert color="secondary">
            <Text>This is a secondary alert—check it out!</Text>
          </Alert>
          <Alert color="success">
            <Text>This is a success alert—check it out!</Text>
          </Alert>
          <Alert color="danger">
            <Text>This is a danger alert—check it out!</Text>
          </Alert>
          <Alert color="warning">
            <Text>This is a warning alert—check it out!</Text>
          </Alert>
          <Alert color="info">
            <Text>This is a info alert—check it out!</Text>
          </Alert>
          <Alert color="light">
            <Text>This is a light alert—check it out!</Text>
          </Alert>
          <Alert color="dark">
            <Text>This is a dark alert—check it out!</Text>
          </Alert>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'<Alert color="primary">\n' +
              '  <Text>This is a primary alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="secondary">\n' +
              '  <Text>This is a secondary alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="success">\n' +
              '  <Text>This is a success alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="danger">\n' +
              '  <Text>This is a danger alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="warning">\n' +
              '  <Text>This is a warning alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="info">\n' +
              '  <Text>This is a info alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="light">\n' +
              '  <Text>This is a light alert—check it out!</Text>\n' +
              '</Alert>\n' +
              '<Alert color="dark">\n' +
              '  <Text>This is a dark alert—check it out!</Text>\n' +
              '</Alert>'}
          </Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleAlerts;
