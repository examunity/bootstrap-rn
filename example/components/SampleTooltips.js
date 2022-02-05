import React from 'react';
import { Heading, injectTooltip, Button, Text } from 'bootstrap-rn';

const TooltipButton = injectTooltip(Button);

function SampleTooltips() {
  return (
    <>
      <Heading size={2}>Tooltips</Heading>
      <TooltipButton
        tooltip={{
          title: 'This is the content of Tooltip',
          placement: 'right',
        }}
      >
        <Text>Open Tooltip</Text>
      </TooltipButton>
    </>
  );
}

export default SampleTooltips;
