import React from 'react';
import { View, Spinner } from 'bootstrap-rn';

const SpinnerMeta = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    //
  },
};

export default SpinnerMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
      <Spinner />
      <Spinner variant="grow" />
    </View>
  );
}
