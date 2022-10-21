import React from 'react';
import {
  Heading,
  Text,
  View,
  Breadcrumb,
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Breadcrumb>\n' +
  ' <Breadcrumb.Item>\n' +
  '   <Text>Home</Text>\n' +
  ' </Breadcrumb.Item>\n' +
  ' <Breadcrumb.Item>\n' +
  '   <Text>/</Text>\n' +
  ' </Breadcrumb.Item>\n' +
  ' <Breadcrumb.Item>\n' +
  '   <Text>Library</Text>\n' +
  ' </Breadcrumb.Item>\n' +
  ' <Breadcrumb.Item>\n' +
  '  <Text>/</Text>\n' +
  ' </Breadcrumb.Item>\n' +
  ' <Breadcrumb.Item active>\n' +
  '   <Text>Data</Text>\n' +
  ' </Breadcrumb.Item>\n' +
  '</Breadcrumb>\n' +
  '</>';

function SampleBreadcrumb() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Badge</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Badge </Text>
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
            <Text>active</Text>
          </Col>
          <Col size={6}>
            <Text small>no values</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}
      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Breadcrumb (TODO: add colors){' '}
          </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Text>Home</Text>
              </Breadcrumb.Item>
            </Breadcrumb>

            <Breadcrumb>
              <Breadcrumb.Item>
                <Text>Home</Text>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Text>/</Text>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                <Text>Library</Text>
              </Breadcrumb.Item>
            </Breadcrumb>

            <Breadcrumb>
              <Breadcrumb.Item>
                <Text>Home</Text>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Text>/</Text>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Text>Library</Text>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Text>/</Text>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                <Text>Data</Text>
              </Breadcrumb.Item>
            </Breadcrumb>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleBreadcrumb;
