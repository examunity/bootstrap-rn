import React from 'react';
import MyButton from './Button';

const MyButtonMeta = {
  title: 'MyButton',
  component: MyButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  },
};

export default MyButtonMeta;

export function Basic(args) {
  return <MyButton {...args} />;
}

export function Advanced(args) {
  return <MyButton {...args} />;
}
