import React from 'react';
import { Container, Row, Col, Heading, Text, Code, View } from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  ' <Dropdown direction="bottom">\n' +
  '   <Container>\n' +
  '     <Row>\n' +
  '       <Col size={9} styleName="bg-primary">\n' +
  '         <Text>Test1 Test2</Text>\n' +
  '       </Col>\n' +
  '       <Col size={3} styleName="bg-danger">\n' +
  '         <Text>Test3</Text>\n' +
  '       </Col>\n' +
  '     </Row>\n' +
  ' </Container>\n' +
  '   \n' +
  '   <Row>\n' +
  '     <Col size={4} styleName="bg-warning">\n' +
  '       <Text>Test1 Test2</Text>\n' +
  '     </Col>\n' +
  '     <Col size={4} styleName="bg-warning">\n' +
  '       <Text>Test3</Text>\n' +
  '     </Col>\n' +
  '     <Col size={4} styleName="bg-warning">\n' +
  '       <Text>Test3</Text>\n' +
  '     </Col>\n' +
  '   </Row>\n' +
  '</>';

function SampleGrid() {
  return (
    <>
      <Heading size={2}>Grid</Heading>
      <Container>
        <Row>
          <Col size={9} styleName="bg-primary">
            <Text>Container Row Col</Text>
          </Col>
          <Col size={3} styleName="bg-danger">
            <Text>Test3</Text>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col size={4} styleName="bg-warning">
          <Text>Test1 Test2</Text>
        </Col>
        <Col size={4} styleName="bg-warning">
          <Text>Test3</Text>
        </Col>
        <Col size={4} styleName="bg-warning">
          <Text>Test3</Text>
        </Col>
      </Row>

      <View styleName="flex-row ai-center bg-dark my-3">
        <Code styleName="text-warning">{exampleCode}</Code>
      </View>

      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Grid (Container, Row, Col)</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Container </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Row </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Col </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SampleGrid;
