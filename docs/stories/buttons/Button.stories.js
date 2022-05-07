import React from 'react';
import { View, Button, Text } from 'bootstrap-rn';

const ButtonMeta = {
  title: 'Button',
  component: Button,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
        'link',
      ],
      control: { type: 'select' },
    },
  },
};

export default ButtonMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Button {...args}>
        <Text>Button</Text>
      </Button>
    </View>
  );
}

export function Sizes(args) {
  return (
    <View styleName="align-items-center">
      <Button {...args} size="sm" styleName="mb-3">
        <Text>Button</Text>
      </Button>
      <Button {...args} size="lg">
        <Text>Button</Text>
      </Button>
    </View>
  );
}
