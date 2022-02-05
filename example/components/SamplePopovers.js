import React from 'react';
import { Heading, injectPopover, Button, Text } from 'bootstrap-native';

const PopoverButton = injectPopover(Button);

function SamplePopovers() {
  return (
    <>
      <Heading size={2}>Popovers</Heading>
      <PopoverButton
        popover={{
          title: 'Title',
          content: <Text>This is the content of Popover</Text>,
          placement: 'bottom',
        }}
      >
        <Text>Open this Popover</Text>
      </PopoverButton>
    </>
  );
}

export default SamplePopovers;
