import React from 'react';
import { ListGroup, Heading } from 'bootstyle';

function SampleListGroup() {
  return (
    <>
      <Heading size={2}>List group</Heading>
      <ListGroup>
        <ListGroup.Item>Patrick Item first</ListGroup.Item>
        <ListGroup.Item>Patrick Item Second</ListGroup.Item>
        <ListGroup.Item>Patrick Item 3</ListGroup.Item>
        <ListGroup.Item>Patrick Item 4</ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default SampleListGroup;
