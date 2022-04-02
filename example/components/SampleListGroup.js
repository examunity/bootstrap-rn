import React from 'react';
import {
  ListGroup,
  Heading,
  Text,
  Container,
  Row,
  Col,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<ListGroup>\n' +
  '  <ListGroup.Item active>\n' +
  '    <Text>I am active</Text>\n' +
  '  </ListGroup.Item>\n' +
  '  <ListGroup.Item>\n' +
  '    <Text>Default</Text>\n' +
  '  </ListGroup.Item>\n' +
  '    <ListGroup.Item>\n' +
  '      <Text>Default</Text>\n' +
  '    </ListGroup.Item>\n' +
  '    <ListGroup.Item disabled>\n' +
  '      <Text>disabled ?</Text>\n' +
  '    </ListGroup.Item>\n' +
  '  <ListGroup.Item color="dark">\n' +
  '    <Text>dark</Text>\n' +
  ' </ListGroup.Item>\n' +
  '</ListGroup>\n' +
  '</>';

const exampleCodeAction =
  '<>\n' +
  '<ListGroup flush>\n' +
  '<ListGroup.ItemAction>\n' +
  '  <Text>Action</Text>\n' +
  '</ListGroup.ItemAction>\n' +
  '<ListGroup.ItemAction disabled>\n' +
  '  <Text>disabled ?</Text>\n' +
  '</ListGroup.ItemAction>\n' +
  '<ListGroup.ItemAction color="danger">\n' +
  '  <Text>Action</Text>\n' +
  '</ListGroup.ItemAction>\n' +
  '<ListGroup.ItemAction color="warning">\n' +
  '  <Text>Action</Text>\n' +
  '</ListGroup.ItemAction>\n' +
  '<ListGroup.ItemAction color="dark">\n' +
  '  <Text>Action</Text>\n' +
  '</ListGroup.ItemAction>\n' +
  '</ListGroup>\n' +
  '</>';

function SampleListGroup() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API ListGroup</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ListGroup </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
          <Col size={12}>
            <Text color="primary">ListGroup.Item</Text>
            <Text color="primary">ListGroup.Action</Text>
          </Col>
        </Row>
      </Container>
      {/* PROPS -----------------------------------------------------  */}
      <Container styleName="mb-5">
        <Row styleName="bg-secondary">
          <Col size={6}>
            <Text>ListGroup Propname</Text>
          </Col>
          <Col size={6}>
            <Text>Value</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>flush</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>

        <Row styleName="bg-secondary mt-3">
          <Col size={6}>
            <Text>ListGroup.Item Propname</Text>
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
            <Text>active | disabled</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>ListGroup</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <ListGroup>
              {null}
              <>
                <ListGroup.Item active>
                  <Text>I am active</Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Text>Default</Text>
                </ListGroup.Item>
                <>
                  <ListGroup.Item>
                    <Text>Default</Text>
                  </ListGroup.Item>
                  <ListGroup.Item disabled>
                    <Text>disabled ?</Text>
                  </ListGroup.Item>
                </>
                <ListGroup.Item color="dark">
                  <Text>dark</Text>
                </ListGroup.Item>
              </>
            </ListGroup>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>ListGroup Action</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <ListGroup flush>
              <ListGroup.ItemAction>
                <Text>Action</Text>
              </ListGroup.ItemAction>
              <ListGroup.ItemAction disabled>
                <Text>disabled ?</Text>
              </ListGroup.ItemAction>
              <ListGroup.ItemAction color="danger">
                <Text>Action</Text>
              </ListGroup.ItemAction>
              <ListGroup.ItemAction color="warning">
                <Text>Action</Text>
              </ListGroup.ItemAction>
              <ListGroup.ItemAction color="dark">
                <Text>Action</Text>
              </ListGroup.ItemAction>
            </ListGroup>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeAction}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleListGroup;
