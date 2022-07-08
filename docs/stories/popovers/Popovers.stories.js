import React from 'react';
import { View, injectPopover, Text } from 'bootstrap-rn';

const injectPopoverMeta = {
  title: 'injectPopover',
  component: injectPopover,
  argTypes: {
    //
  },
};

export default injectPopoverMeta;

export function Basic(args) {
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
