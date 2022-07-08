import React from 'react';
import { View, Text } from 'bootstrap-rn';

const FormMeta = {
  title: 'Form',
  component: Form,
  argTypes: {
    //
  },
};

export default FormMeta;

export function Basic(args) {
  return <View styleName="align-items-center"></View>;
}
