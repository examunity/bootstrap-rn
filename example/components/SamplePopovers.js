import React from 'react';
import {
  Heading,
  injectPopover,
  Button,
  Text,
  Container,
  Row,
  Col,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const PopoverButton = injectPopover(Button);

const exampleCode =
  '<>\n' +
  '<PopoverButton\n' +
  ' popover={{\n' +
  '  title: "Title",\n' +
  '  content: <Text>This is the content of Popover</Text>,\n' +
  '  placement: "top",\n' +
  ' }}\n' +
  '>\n' +
  '<Text>Open this Popover</Text>\n' +
  '</PopoverButton>\n' +
  '</>';

function SamplePopovers() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API injectPopover</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">injectPopover </Text>
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
            <Text />
          </Col>
          <Col size={6}>
            <Text small />
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Popovers</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <PopoverButton
              popover={{
                title: 'Title',
                content: <Text>This is the content of Popover</Text>,
                placement: 'top',
              }}
            >
              <Text>Open this Popover</Text>
            </PopoverButton>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SamplePopovers;
