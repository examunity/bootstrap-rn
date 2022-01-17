import React from 'react';
import { Tooltip, Heading, Text } from 'bootstyle';

function SampleTooltips() {
  return (
    <>
      <Heading size={2}>Tooltips</Heading>
      <Tooltip placement="right" title="This is the content of Tooltip">
        <Text>Open Tooltip</Text>
      </Tooltip>
    </>
  );
}

export default SampleTooltips;
