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
      <Heading size={2}>Buttons</Heading>

      <Container styleName="mb-3">
        <Row>
          <Heading size={2}>Beispiele</Heading>
        </Row>
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

      <Container styleName="bg-dark my-2">
        <Row>
          <Col size={12}>
            <Code styleName="text-warning">{exampleCode}</Code>
          </Col>
        </Row>
      </Container>

      <Container styleName="mb-3">
        <Row>
          <Heading size={2}>Outline Buttons</Heading>
        </Row>
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

      <Container styleName="bg-dark my-2">
        <Row>
          <Col size={12}>
            <Code styleName="text-warning">{exampleCodeOutline}</Code>
          </Col>
        </Row>
      </Container>

      <Container styleName="mb-3">
        <Row>
          <Heading size={2}>Größen</Heading>
        </Row>
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

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCodeSize}</Code>
      </View>

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

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCodeActiveDisabled}</Code>
      </View>

      <Button toggle={Button}>
        <Text>Toggle button</Text>
      </Button>

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCodeTogglebutton}</Code>
      </View>

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
            <Text small>The visual style of the Button</Text>
          </Col>
        </Row>

        <Row styleName="bg-info">
          <Col size={2}>
            <Text>size</Text>
          </Col>
          <Col size={4}>
            <Text small>defaul | sm | lg</Text>
          </Col>
          <Col size={2}>
            <Text>normal</Text>
          </Col>
          <Col size={4}>
            <Text small>(Default) Specifies a large or small button.</Text>
          </Col>
        </Row>

        <Row>
          <Col size={2}>
            <Text>outline</Text>
          </Col>
          <Col size={4}>
            <Text>outline for all colors</Text>
          </Col>
          <Col size={2}>
            <Text> </Text>
          </Col>
          <Col size={4}>
            <Text> </Text>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleButtons;
