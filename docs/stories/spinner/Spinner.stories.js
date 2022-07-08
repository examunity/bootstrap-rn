import React from 'react';
import { View, Spinner, Text } from 'bootstrap-rn';

const SpinnerMeta = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    //
  },
};

export default SpinnerMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Spinner />
      <Spinner variant="grow" />
    </View>
  );
}
