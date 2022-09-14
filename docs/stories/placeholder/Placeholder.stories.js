import React from 'react';
import { View, Placeholders, Text } from 'bootstrap-rn';

const PlaceholdersMeta = {
  title: 'Placeholders',
  component: Placeholders,
  argTypes: {
    //
  },
};

export default PlaceholdersMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
      <Placeholders>
        <Text>Placeholders</Text>
      </Placeholders>
    </View>
  );
}
