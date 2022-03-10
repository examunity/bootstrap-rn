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
      <Heading size={2}>Popovers</Heading>
      <PopoverButton
        popover={{
          title: 'Title',
          content: <Text>This is the content of Popover</Text>,
          placement: 'top',
        }}
      >
        <Text>Open this Popover</Text>
      </PopoverButton>

      <View styleName="flex-row ai-center bg-dark my-3 p-2">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

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
    </>
  );
}

export default SamplePopovers;
