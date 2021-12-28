import React from 'react';
import { Badge, Heading, Text } from 'bootstyle';

function Badges() {
  return (
    <>
      <Heading size={2}>Badges</Heading>
      <Text>
        User Online: <Badge styleName="bg-primary">40</Badge>
      </Text>
    </>
  );
}

export default Badges;
