import React from 'react';
import { View, injectTooltip, Button, Text } from 'bootstrap-rn';

const TooltipMeta = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    //
  },
};
const TooltipButton = injectTooltip(Button);

export default TooltipMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <TooltipButton
        tooltip={{
          title: 'This is the content of Tooltip',
          placement: 'top',
        }}
      >
        <Text>Open Tooltip</Text>
      </TooltipButton>
    </View>
  );
}
