import React from 'react';
import { Tooltip, Text } from 'bootstyle';

function Tooltips() {
  return (
    <Tooltip placement="top" title="This is the content of Tooltip">
      <Text>Open Tooltip</Text>
    </Tooltip>
  );
}

export default Tooltips;
