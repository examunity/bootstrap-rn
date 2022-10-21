import React from 'react';
import {
  Heading,
  injectTooltip,
  Button,
  Text,
  Container,
  Row,
  Col,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const TooltipButton = injectTooltip(Button);

const exampleCode =
  '<>\n' +
  '<TooltipButton\n' +
  'tooltip={{\n' +
  '  title: "This is the content of Tooltip",\n' +
  '  placement: "top",\n' +
  '}}\n' +
  '>\n' +
  '<Text>Open Tooltip</Text>\n' +
  '</TooltipButton>\n' +
  '</>';

function SampleTooltips() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API injectTooltip</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">injectTooltip </Text>
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
            <Text>placement</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.string</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>popper</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Tooltips
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <TooltipButton
              tooltip={{
                title: 'This is the content of Tooltip',
                placement: 'top',
              }}
            >
              <Text>Open Tooltip</Text>
            </TooltipButton>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleTooltips;
