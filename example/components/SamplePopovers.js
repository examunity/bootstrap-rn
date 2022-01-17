import React from 'react';
import { Popover, Heading, Text } from 'bootstyle';

function SamplePopovers() {
  return (
    <>
      <Heading size={2}>Popovers</Heading>
      <Popover
        placement="bottom"
        title={<Text>Title</Text>}
        content={<Text>This is the content of Popover</Text>}
      >
        <Text>Open this Popover</Text>
      </Popover>
    </>
  );
}

export default SamplePopovers;
