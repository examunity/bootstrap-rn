import React from 'react';
import { ListGroup, Heading, Text } from 'bootstyle';

function SampleListGroup() {
  return (
    <>
      <Heading size={2}>List group</Heading>
      <Heading size={6}>ListGroupItem sample</Heading>
      <ListGroup>
        {null}
        <>
          <ListGroup.Item active>
            <Text>I am active</Text>
          </ListGroup.Item>
          <ListGroup.Item>
            <Text>Default</Text>
          </ListGroup.Item>
          <>
            <ListGroup.Item>
              <Text>Default</Text>
            </ListGroup.Item>
            <ListGroup.Item disabled>
              <Text>disabled ?</Text>
            </ListGroup.Item>
          </>
          <ListGroup.Item color="dark">
            <Text>dark</Text>
          </ListGroup.Item>
        </>
      </ListGroup>

      <Heading size={6} styleName="mt-3">
        ListGroupItemAction sample
      </Heading>
      <ListGroup flush>
        <ListGroup.ItemAction>
          <Text>Action</Text>
        </ListGroup.ItemAction>
        <ListGroup.ItemAction disabled>
          <Text>disabled ?</Text>
        </ListGroup.ItemAction>
        <ListGroup.ItemAction color="danger">
          <Text>Action</Text>
        </ListGroup.ItemAction>
        <ListGroup.ItemAction color="warning">
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
