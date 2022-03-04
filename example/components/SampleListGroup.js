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
      <Heading size={2}>List group</Heading>
      <Heading size={6}>ListGroupItem sample</Heading>
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

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Heading size={6} styleName="mt-3">
        ListGroupItemAction sample
      </Heading>
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

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCodeAction}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API ListGroup</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ListGroup </Text>
              <Text color="dark">from </Text>
              <Text color="primary">'bootstrap-rn'</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleListGroup;
