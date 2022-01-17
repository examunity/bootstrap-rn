import React from 'react';
import { Popover, Heading, Text } from 'bootstyle';

function SamplePopovers() {
  return (
    <>
      <Heading size={2}>Popovers</Heading>
      <Popover
        placement="bottom"
        title="Title"
        content="This is the content of Popover"
      >
        <Text>Open this Popover</Text>
      </Popover>
    </>
  );
}

export default SamplePopovers;
