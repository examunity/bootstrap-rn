import React from 'react';
import { View, Placeholders, Text } from 'bootstrap-rn';

const PlaceholdesrMeta = {
  title: 'Placeholders',
  component: Placeholders,
  argTypes: {
    //
  },
};

export default PlaceholdesrMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Placeholders>
        <Text>Placeholders</Text>
      </Placeholders>
    </View>
  );
}
