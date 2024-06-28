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
  ' <Badge styleName="bg-primary"><Text>primary</Text></Badge>\n' +
  ' <Badge styleName="bg-secondary"><Text>secondary</Text></Badge>\n' +
  ' <Badge styleName="bg-success"><Text>success</Text></Badge>\n' +
  ' <Badge styleName="bg-danger"><Text>danger</Text></Badge>\n' +
  ' <Badge styleName="bg-warning text-dark"><Text>warning</Text></Badge>\n' +
  ' <Badge styleName="bg-info text-dark"><Text>info</Text></Badge>\n' +
  ' <Badge styleName="bg-light text-dark"><Text>light</Text></Badge>\n' +
  ' <Badge styleName="bg-dark"><Text>dark</Text></Badge>\n' +
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
          <Heading size={5} styleName="mb-0">
            Badges
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="ai-center">
            <Badge styleName="bg-primary mb-2">
              <Text>primary</Text>
            </Badge>
            <Badge styleName="bg-secondary mb-2">
              <Text>secondary</Text>
            </Badge>
            <Badge styleName="bg-success mb-2">
              <Text>success</Text>
            </Badge>
            <Badge styleName="bg-danger mb-2">
              <Text>danger</Text>
            </Badge>
            <Badge styleName="bg-warning mb-2">
              <Text styleName="text-dark">warning</Text>
            </Badge>
            <Badge styleName="bg-info mb-2">
              <Text styleName="text-dark">info</Text>
            </Badge>
            <Badge styleName="bg-light mb-2">
              <Text styleName="text-dark">light</Text>
            </Badge>
            <Badge styleName="bg-dark">
              <Text>dark</Text>
            </Badge>
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
    <Heading size={5} styleName="mb-0">HEADER</Heading>
  </Card.Header>
  <Card.Body>
    <View styleName="flex-column"></View>
  </Card.Body>
  <Card.Footer styleName="bg-dark">
    <Code styleName="text-warning">{exampleCode}</Code>
  </Card.Footer>
</Card>

*/
