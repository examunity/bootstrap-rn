import React from 'react';
import { Row, Col, Heading, Text } from 'bootstyle';

function SampleGrid() {
  return (
    <>
      <Heading size={2}>Grid</Heading>
      <Row>
        <Col size={6}>
          <Text>Test Test</Text>
        </Col>
        <Col size={6}>
          <Text>Test</Text>
        </Col>
      </Row>
    </>
  );
}

export default SampleGrid;
