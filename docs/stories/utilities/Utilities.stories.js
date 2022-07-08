import React from 'react';
import { View, Text } from 'bootstrap-rn';

const UtilitiesMeta = {
  title: 'Utilities',
  component: Utilities,
  argTypes: {
    //
  },
};

export default UtilitiesMeta;

export function Basic(args) {
  return <View styleName="align-items-center"></View>;
}
