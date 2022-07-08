import React from 'react';
import { View, Alert, Text } from 'bootstrap-rn';

const AlertMeta = {
  title: 'Alert',
  component: Alert,
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

export default AlertMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Alert {...args}>
        <Text>This is a primary alert—check it out!</Text>
      </Alert>
    </View>
  );
}
