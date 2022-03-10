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

const badgeExampleCode =
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
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Badges</Heading>
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
          <Code styleName="text-warning">{badgeExampleCode}</Code>
        </Card.Footer>
      </Card>

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

      <Container>
        <Row styleName="bg-secondary">
          <Col size={2}>
            <Text>Name</Text>
          </Col>
          <Col size={4}>
            <Text>Type</Text>
          </Col>
          <Col size={2}>
            <Text>Default</Text>
          </Col>
          <Col size={4}>
            <Text>Description</Text>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleBadges;
