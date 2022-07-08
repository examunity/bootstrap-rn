import React from 'react';
import { View, ListGroup, Text } from 'bootstrap-rn';

const ListGroupMeta = {
  title: 'ListGroup',
  component: ListGroup,
  argTypes: {
    //
  },
};

export default ListGroupMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
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
    </View>
  );
}
