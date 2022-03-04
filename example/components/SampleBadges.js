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
  ' <Badge color="primary">primary</Badge>\n' +
  ' <Badge color="secondary">secondary</Badge>\n' +
  ' <Badge color="success">success</Badge>\n' +
  ' <Badge color="danger">danger</Badge>\n' +
  ' <Badge color="warning">warning</Badge>\n' +
  ' <Badge color="info">info</Badge>\n' +
  ' <Badge color="light">light</Badge>\n' +
  ' <Badge color="dark">dark</Badge>\n' +
  '</>';

function SampleBadges() {
  return (
    <>
      <Card styleName={'mb-3'}>
        <Card.Header>
          <Heading size={5}>Badges</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-row ai-center">
            <Badge color="primary" styleName="mr-1">
              primary
            </Badge>
            <Badge color="secondary" styleName="mr-1">
              secondary
            </Badge>
            <Badge color="success" styleName="mr-1">
              success
            </Badge>
            <Badge color="danger" styleName="mr-1">
              danger
            </Badge>
            <Badge color="warning" styleName="mr-1">
              warning
            </Badge>
            <Badge color="info" styleName="mr-1">
              info
            </Badge>
            <Badge color="light" styleName="mr-1">
              light
            </Badge>
            <Badge color="dark" styleName="mr-1">
              dark
            </Badge>
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
              <Text color="primary">'bootstrap-rn'</Text>
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
        <Row>
          <Col size={2}>
            <Text>color</Text>
          </Col>
          <Col size={4}>
            <Text small>
              primary | secondary | success | danger | warning | info | light |
              dark
            </Text>
          </Col>
          <Col size={2}>
            <Text>primary</Text>
          </Col>
          <Col size={4}>
            <Text small>The visual style of the badge</Text>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleBadges;
