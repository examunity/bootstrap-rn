import React, { useMemo } from 'react';
import { View, injectTooltip, Tooltip, Button, Text } from 'bootstrap-rn';

const TooltipMeta = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    //
  },
};

export default TooltipMeta;

export function Basic() {
  const TooltipButton = useMemo(() => injectTooltip(Button), []);

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
