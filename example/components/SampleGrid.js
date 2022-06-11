import React from 'react';
import {
  Container,
  Row,
  Col,
  Heading,
  Text,
  Code,
  View,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  ' <Container>\n' +
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
      {/* PROPS -----------------------------------------------------  */}
      <Container styleName="mb-5">
        <Row styleName="bg-secondary">
          <Col size={6}>
            <Text>Col Propname</Text>
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
            <Text small>1 bis 12</Text>
          </Col>
        </Row>

        <Row styleName="bg-secondary mt-3">
          <Col size={6}>
            <Text>Row Propname</Text>
          </Col>
          <Col size={6}>
            <Text>Value</Text>
          </Col>
        </Row>

        <Row>
          <Col size={6}>
            <Text>rows</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.number</Text>
          </Col>
        </Row>

        <Row styleName="bg-secondary mt-3">
          <Col size={6}>
            <Text>Container Propname</Text>
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
            <Text small>PropTypes.oneOf([&apos;auto&apos;, ...sizes])</Text>
          </Col>
        </Row>
        <Row styleName="bg-info">
          <Col size={6}>
            <Text>sizeSm</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.oneOf([&apos;auto&apos;, ...sizes])</Text>
          </Col>
        </Row>
        <Row>
          <Col size={6}>
            <Text>sizeMd</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.oneOf([&apos;auto&apos;, ...sizes])</Text>
          </Col>
        </Row>
        <Row styleName="bg-info">
          <Col size={6}>
            <Text>sizeLg</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.oneOf([&apos;auto&apos;, ...sizes])</Text>
          </Col>
        </Row>
        <Row>
          <Col size={6}>
            <Text>sizeXl</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.oneOf([&apos;auto&apos;, ...sizes])</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Grid</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
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
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleGrid;
