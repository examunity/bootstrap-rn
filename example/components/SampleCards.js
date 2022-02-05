import React from 'react';
import { Card, Heading, Text } from 'bootstrap-native';

function SampleCards() {
  return (
    <>
      <Heading size={2}>Cards</Heading>
      <Card>
        <Card.Header>
          <Text>Card Header Text</Text>
        </Card.Header>
        <Card.Body>
          <Text>Body Text</Text>
        </Card.Body>
        <Card.Footer>
          <Text>Card Footer Text</Text>
        </Card.Footer>
      </Card>
    </>
  );
}

export default SampleCards;
