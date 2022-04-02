import React from 'react';
import {
  Heading,
  Text,
  View,
  Pagination,
  Card,
  Code,
  Container,
  Row,
  Col,
} from 'bootstrap-rn';

const exampleCode =
  '<>\n' +
  '<Pagination>\n' +
  '<Pagination.Item>\n' +
  '  <Text>Previous</Text>\n' +
  '</Pagination.Item>\n' +
  '<Pagination.Item>\n' +
  '  <Text>1</Text>\n' +
  '</Pagination.Item>\n' +
  '<Pagination.Item>\n' +
  '  <Text>2</Text>\n' +
  '</Pagination.Item>\n' +
  '<Pagination.Item>\n' +
  '  <Text>3</Text>\n' +
  '</Pagination.Item>\n' +
  '<Pagination.Item>\n' +
  '  <Text>Next</Text>\n' +
  '</Pagination.Item>\n' +
  '</Pagination>\n' +
  '</>';

const exampleCodeState =
  '<>\n' +
  '<Pagination>\n' +
  '<Pagination.Item disabled>\n' +
  '  <Text>Previous</Text>\n' +
  '</Pagination.Item >\n' +
  '...\n' +
  '<Pagination.Item active>\n' +
  '  <Text>1</Text>\n' +
  '</Pagination.Item>\n' +
  '</Pagination>\n' +
  '</>';

const exampleCodeSize =
  '<>\n' + '<Pagination size="lg">\n' + '<Pagination size="sm">\n' + '</>';

function SamplePagination() {
  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API Pagination</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Pagination </Text>
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
            <Text>active | disabled</Text>
          </Col>
          <Col size={6}>
            <Text small>PropTypes.bool</Text>
          </Col>
        </Row>
      </Container>
      {/* END PROPS -----------------------------------------------------  */}

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Pagination</Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Pagination>
              <Pagination.Item>
                <Text>Previous</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>1</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>2</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>3</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>Next</Text>
              </Pagination.Item>
            </Pagination>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCode}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Pagination states (disabled, active) </Heading>
        </Card.Header>
        <Card.Body>
          <View styleName="flex-column">
            <Pagination>
              <Pagination.Item disabled>
                <Text>Previous</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>1</Text>
              </Pagination.Item>
              <Pagination.Item active>
                <Text>2</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>3</Text>
              </Pagination.Item>
              <Pagination.Item>
                <Text>Next</Text>
              </Pagination.Item>
            </Pagination>
          </View>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeState}</Code>
        </Card.Footer>
      </Card>

      <Card styleName="mb-3">
        <Card.Header>
          <Heading size={5}>Pagnation sizing</Heading>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col size={6}>
                <Pagination size="sm">
                  <Pagination.Item>
                    <Text>0</Text>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Text>1</Text>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Text>2</Text>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Text>3</Text>
                  </Pagination.Item>
                  <Pagination.Item active>
                    <Text>SM</Text>
                  </Pagination.Item>
                </Pagination>
              </Col>
              <Col size={6}>
                {' '}
                <Pagination size="lg">
                  <Pagination.Item>
                    <Text>0</Text>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Text>1</Text>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Text>2</Text>
                  </Pagination.Item>
                  <Pagination.Item>
                    <Text>3</Text>
                  </Pagination.Item>
                  <Pagination.Item active>
                    <Text>LG</Text>
                  </Pagination.Item>
                </Pagination>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{exampleCodeSize}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SamplePagination;
