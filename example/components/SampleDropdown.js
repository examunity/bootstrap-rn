import React from 'react';
import {
  Dropdown,
  Text,
  Heading,
  Button,
  View,
  Container,
  Row,
  Col,
  Code,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n ' +
  ' <Dropdown direction="bottom">\n ' +
  '   <Button toggle={Dropdown} styleName="as-center">\n ' +
  '     <Text>Show Dropdown</Text>\n ' +
  '   </Button>\n ' +
  '   <Dropdown.Menu>\n ' +
  '     <Dropdown.Header>\n ' +
  '       <Text>Dropdown header</Text>\n ' +
  '     </Dropdown.Header>\n ' +
  '     <Dropdown.Divider />\n ' +
  '     <Dropdown.Item active disabled>\n ' +
  '       <View>\n ' +
  '         <Text>Dropdown Item 101</Text>\n ' +
  '       </View>\n ' +
  '     </Dropdown.Item>\n ' +
  '     <Dropdown.Item active>\n ' +
  '       <View>\n ' +
  '         <Text>Dropdown Item 102</Text>\n ' +
  '       </View>\n ' +
  '     </Dropdown.Item>\n ' +
  '       <Dropdown.TextItem>Dropdown Item Text 101</Dropdown.TextItem>\n ' +
  '     <Dropdown.Item>\n ' +
  '       <View>\n ' +
  '         <Text>Dropdown Item 201</Text>\n ' +
  '       </View>\n ' +
  '     </Dropdown.Item>\n ' +
  '   </Dropdown.Menu>\n ' +
  ' </Dropdown>\n ' +
  '</>';

function SampleDropdowns() {
  return (
    <>
      <Heading size={2}>Dropdown</Heading>
      <Dropdown direction="bottom">
        <Button toggle={Dropdown} styleName="as-center">
          <Text>Show Dropdown</Text>
        </Button>
        <Dropdown.Menu>
          <Dropdown.Header>
            <Text>Dropdown header</Text>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item active disabled>
            <View>
              <Text>Dropdown Item 101</Text>
            </View>
          </Dropdown.Item>
          <Dropdown.Item active>
            <View>
              <Text>Dropdown Item 102</Text>
            </View>
          </Dropdown.Item>
          <Dropdown.TextItem>Dropdown Item Text 101</Dropdown.TextItem>
          <Dropdown.Item>
            <View>
              <Text>Dropdown Item 201</Text>
            </View>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Dropdown</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Dropdown </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleDropdowns;
