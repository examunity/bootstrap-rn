import React from 'react';
import {
  View,
  Badge,
  Heading,
  Text,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  ' <Badge styleName="bg-primary">primary</Badge>\n' +
  ' <Badge styleName="bg-secondary">secondary</Badge>\n' +
  ' <Badge styleName="bg-success">success</Badge>\n' +
  ' <Badge styleName="bg-danger">danger</Badge>\n' +
  ' <Badge styleName="bg-warning text-dark">warning</Badge>\n' +
  ' <Badge styleName="bg-info text-dark">info</Badge>\n' +
  ' <Badge styleName="bg-light text-dark">light</Badge>\n' +
  ' <Badge styleName="bg-dark">dark</Badge>\n' +
  '</>';

function SampleBadges() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Badge</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Badge </Text>
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
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Badges </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-row ai-center">
            <Badge styleName="bg-primary mr-1">primary</Badge>
            <Badge styleName="bg-secondary mr-1">secondary</Badge>
            <Badge styleName="bg-success mr-1">success</Badge>
            <Badge styleName="bg-danger mr-1">danger</Badge>
            <Badge styleName="bg-warning text-dark mr-1">warning</Badge>
            <Badge styleName="bg-info text-dark mr-1">info</Badge>
            <Badge styleName="bg-light text-dark mr-1">light</Badge>
            <Badge styleName="bg-dark mr-1">dark</Badge>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleBadges;

/*
TODO: Colors hinzufügen 


<Card styleName="mb-3">
  <Card.Header>
    <Heading size={5}>HEADER</Heading>
  </Card.Header>
  <Card.Body>
    <View styleName="flex-column"></View>
  </Card.Body>
  <Card.Footer styleName="bg-dark">
    <Code styleName="text-warning">{exampleCode}</Code>
  </Card.Footer>
</Card>

*/
