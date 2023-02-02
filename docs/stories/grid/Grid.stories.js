import React from 'react';
import { View, Container, Row, Col, Text } from 'bootstrap-rn';

const GridMeta = {
  title: 'Row',
  component: Row,
  argTypes: {
    //
  },
};

export default GridMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
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
  );
}
