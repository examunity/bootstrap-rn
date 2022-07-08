import React from 'react';
import { View, ToastContainer, Toast, Text } from 'bootstrap-rn';

const ToastMeta = {
  title: 'Toast',
  component: Toast,
  argTypes: {
    //
  },
};

export default ToastMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <ToastContainer>
        <Toast>
          <Toast.Header>
            <Text bold>Toast Header</Text>
          </Toast.Header>
          <Toast.Body>
            <Text>Toast Body</Text>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </View>
  );
}
