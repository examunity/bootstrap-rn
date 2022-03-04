import React from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
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
  ' <ButtonGroup>\n' +
  '   <Button>\n' +
  '     <Text>Ron</Text>\n' +
  '   </Button>\n' +
  '   <Button active>\n' +
  '      <Text>Anton</Text>\n' +
  '   </Button>\n' +
  '   <Button color="secondary" outline>\n' +
  '     <Text>Markus</Text>\n' +
  '   </Button>\n' +
  ' </ButtonGroup>\n' +
  '</>';

function SampleButtonGroup() {
  return (
    <>
      <Heading size={2}>Button group</Heading>
      <ButtonGroup styleName="mb-3">
        <Button>
          <Text>Ron</Text>
        </Button>
        <Button active>
          <Text>Anton</Text>
        </Button>
        <Button color="secondary" outline>
          <Text>Markus</Text>
        </Button>
      </ButtonGroup>

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <ButtonToolbar>
        <ButtonGroup styleName="mr-2">
          <Button>
            <Text>1</Text>
          </Button>
          <Button active>
            <Text>2</Text>
          </Button>
          <Button color="secondary" outline>
            <Text>3</Text>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button color="danger">
            <Text>1</Text>
          </Button>
          <Button color="danger">
            <Text>2</Text>
          </Button>
          <Button color="danger" outline>
            <Text>3</Text>
          </Button>
        </ButtonGroup>
      </ButtonToolbar>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API ButtonGroup</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ButtonGroup </Text>
              <Text color="dark">from </Text>
              <Text color="primary">'bootstrap-rn'</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleButtonGroup;
