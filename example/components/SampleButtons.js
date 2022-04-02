import React from 'react';
import {
  Button,
  Heading,
  Text,
  Container,
  Col,
  Row,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  ' <Button>default</Button> \n' +
  ' <Button color="primary">primary</Button> \n' +
  ' <Button color="secondary">secondary</Button> \n' +
  ' <Button color="success">success</Button> \n' +
  ' <Button color="warning">warning</Button> \n' +
  ' <Button color="danger">danger</Button> \n' +
  ' <Button color="info">info</Button> \n' +
  ' <Button color="light">light</Button> \n' +
  ' <Button color="dark">dark</Button> \n' +
  '</>';

const exampleCodeOutline =
  '<>\n' +
  ' <Button color="primary" outline>primary</Button> \n' +
  ' <Button color="dark" outline>dark</Button> \n' +
  '</>';

const exampleCodeSize =
  '<>\n' +
  ' <Button size="sm">Small sm</Button> \n' +
  ' <Button>Normal default</Button> \n' +
  ' <Button size="lg">Large lg</Button> \n' +
  '</>';

const exampleCodeActiveDisabled =
  '<>\n' +
  ' <Button active>Active</Button> \n' +
  ' <Button disabled>Active</Button> \n' +
  '</>';

const exampleCodeTogglebutton =
  '<>\n <Button toggle={Button}>Toggle button</Button> \n</>';

function SampleButtons() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Button</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Button </Text>
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
            <Text small>defaul | sm | lg</Text>
          </Col>
        </Row>
        <Row styleName="">
          <Col size={6}>
            <Text>outline</Text>
          </Col>
          <Col size={6}>
            <Text small>outline for all colors</Text>
          </Col>
        </Row>
        <Row styleName="bg-info">
          <Col size={6}>
            <Text>active | disabled</Text>
          </Col>
          <Col size={6}>
            <Text small>no value</Text>
          </Col>
        </Row>

        <Row styleName="">
          <Col size={6}>
            <Text> toggle</Text>
          </Col>
          <Col size={6}>
            <Text small>(Button) Component</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Buttons </Heading>
        </Card.Header>
        <Card.Body>
          <Container styleName="mb-3">
            <Row>
              <Button>
                <Text>default</Text>
              </Button>
              <Button color="primary">
                <Text>primary</Text>
              </Button>

              <Button color="secondary">
                <Text>secondary</Text>
              </Button>

              <Button color="success">
                <Text>success</Text>
              </Button>

              <Button color="warning">
                <Text>warning</Text>
              </Button>

              <Button color="danger">
                <Text>danger</Text>
              </Button>

              <Button color="info">
                <Text>info</Text>
              </Button>

              <Button color="light">
                <Text>light</Text>
              </Button>

              <Button color="dark">
                <Text>dark</Text>
              </Button>
            </Row>
          </Container>

          <View styleName="flex-row"></View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Outline Buttons </Heading>
        </Card.Header>
        <Card.Body>
          <Container styleName="mb-3">
            <Row>
              <Button outline>
                <Text>Default</Text>
              </Button>
              <Button color="primary" outline>
                <Text>primary</Text>
              </Button>

              <Button color="secondary" outline>
                <Text>secondary</Text>
              </Button>

              <Button color="success" outline>
                <Text>success</Text>
              </Button>

              <Button color="warning" outline>
                <Text>warning</Text>
              </Button>

              <Button color="danger" outline>
                <Text>danger</Text>
              </Button>

              <Button color="info" outline>
                <Text>info</Text>
              </Button>

              <Button color="light" outline>
                <Text>light</Text>
              </Button>

              <Button color="dark" outline>
                <Text>dark</Text>
              </Button>
            </Row>
          </Container>

          <View styleName="flex-row"></View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeOutline}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Größen </Heading>
        </Card.Header>
        <Card.Body>
          <Container styleName="mb-3">
            <Row>
              <Col size={6}>
                <Button size="sm" styleName="mb-1">
                  <Text>Small sm</Text>
                </Button>
                <Button styleName="mb-1">
                  <Text>Normal default</Text>
                </Button>
                <Button size="lg" styleName="mb-1">
                  <Text>Large lg</Text>
                </Button>
              </Col>

              <Col size={6}>
                <Button color="secondary" size="sm" styleName="mb-1">
                  <Text>Small sm</Text>
                </Button>
                <Button color="secondary" styleName="mb-1">
                  <Text>Normal default</Text>
                </Button>
                <Button color="secondary" size="lg" styleName="mb-1">
                  <Text>Large lg</Text>
                </Button>
              </Col>
            </Row>
          </Container>

          <View styleName="flex-row"></View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeSize}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Buton states </Heading>
        </Card.Header>
        <Card.Body>
          <Container styleName="mb-3">
            <Row>
              <Col size={6}>
                <Heading size={2}>Active state</Heading>

                <Button styleName="mb-1" active>
                  <Text>Active</Text>
                </Button>
                <Button active color="success">
                  <Text>Active </Text>
                </Button>
              </Col>

              <Col size={6}>
                <Heading size={2}>Disabled state</Heading>

                <Button styleName="mb-1" color="secondary" disabled>
                  <Text>Disabled</Text>
                </Button>
                <Button color="success" disabled>
                  <Text>Disabled</Text>
                </Button>
              </Col>
            </Row>
          </Container>

          <View styleName="flex-row"></View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeActiveDisabled}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Toggle button </Heading>
        </Card.Header>
        <Card.Body>
          <Container styleName="mb-3">
            <Row>
              <Button toggle={Button}>
                <Text>Toggle button</Text>
              </Button>
            </Row>
          </Container>

          <View styleName="flex-row"></View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeTogglebutton}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleButtons;
