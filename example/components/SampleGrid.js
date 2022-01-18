import React from 'react';
import { Row, Col, Heading, Text } from 'bootstyle';

function SampleGrid() {
  return (
    <>
      <Heading size={2}>Grid</Heading>
      <Row>
        <Col size={9} styleName="bg-primary">
          <Text>Test1 Test2</Text>
        </Col>
        <Col size={3} styleName="bg-danger">
          <Text>Test3</Text>
        </Col>
      </Row>
    </>
  );
}

export default SampleGrid;
