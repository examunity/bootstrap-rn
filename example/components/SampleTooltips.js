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
} from 'bootstrap-rn';

const TooltipButton = injectTooltip(Button);

const exampleCode =
  '<>\n' +
  ' <Badge color="primary">primary</Badge>\n' +
  ' <Badge color="secondary">secondary</Badge>\n' +
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
      <Heading size={2}>Tooltips</Heading>
      <TooltipButton
        tooltip={{
          title: 'This is the content of Tooltip',
          placement: 'top',
        }}
      >
        <Text>Open Tooltip</Text>
      </TooltipButton>

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API injectTooltip</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">injectTooltip </Text>
              <Text color="dark">from </Text>
              <Text color="primary">'bootstrap-rn'</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleTooltips;
