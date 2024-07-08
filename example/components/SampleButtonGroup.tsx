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
  Card,
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

const ButtonToolbarCode =
  '<>\n' +
  '<ButtonToolbar>\n' +
  ' <ButtonGroup>\n' +
  '   <Button>\n' +
  '    ...\n' +
  '   </Button>\n' +
  ' </ButtonGroup>\n' +
  '</ButtonToolbar>\n' +
  '</>';

function SampleButtonGroup() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API ButtonGroup</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ButtonGroup </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">ButtonToolbar </Text>
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
            <Text>size</Text>
          </Col>
          <Col size={6}>
            <Text small>lg | sm</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Button group
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-row">
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            ButtonToolbar
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-row">
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{ButtonToolbarCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleButtonGroup;
