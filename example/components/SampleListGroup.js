import React from 'react';
import { ListGroup, Heading, Text } from 'bootstyle';

function SampleListGroup() {
  return (
    <>
      <Heading size={2}>List group Item</Heading>
      <ListGroup>
        <ListGroup.Item active>
          <Text>I am active</Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Text>Default</Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <Text>Default</Text>
        </ListGroup.Item>
        <ListGroup.Item disabled>
          <Text>disabled ?</Text>
        </ListGroup.Item>

        <ListGroup.Item color="dark">
          <Text>dark</Text>
        </ListGroup.Item>
      </ListGroup>

      <Heading size={2}>List group Item Action</Heading>
      <ListGroup>
        <ListGroup.ItemAction color="danger">
          <Text>Action</Text>
        </ListGroup.ItemAction>
        <ListGroup.ItemAction color="danger">
          <Text>Action</Text>
        </ListGroup.ItemAction>
        <ListGroup.ItemAction color="danger">
          <Text>Action</Text>
        </ListGroup.ItemAction>
        <ListGroup.ItemAction color="dark">
          <Text>Action</Text>
        </ListGroup.ItemAction>
      </ListGroup>
    </>
  );
}

export default SampleListGroup;
