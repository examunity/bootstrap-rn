import React, { useMemo } from 'react';
import { Popover, View, injectPopover, Text, Button } from 'bootstrap-rn';

const PopoverMeta = {
  title: 'Popover',
  component: Popover,
  argTypes: {
    //
  },
};

export default PopoverMeta;

export function Basic() {
  const PopoverButton = useMemo(() => injectPopover(Button), []);

  return (
    <View styleName="align-items-center">
      <PopoverButton
        popover={{
          title: 'Title',
          content: <Text>This is the content of Popover</Text>,
          placement: 'top',
        }}
      >
        <Text>Open this Popover</Text>
      </PopoverButton>
    </View>
  );
}
