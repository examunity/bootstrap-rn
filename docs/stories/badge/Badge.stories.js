import React from 'react';
import { View, Badge, Text } from 'bootstrap-rn';

const BadgeMeta = {
  title: 'Badge',
  component: Badge,
  argTypes: {
    //
  },
};

export default BadgeMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Badge {...args} styleName="bg-primary">
        <Text>Badge</Text>
      </Badge>
    </View>
  );
}
