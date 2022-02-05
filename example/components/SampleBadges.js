import React from 'react';
import { View, Badge, Heading, Text } from 'bootstyle';

function SampleBadges() {
  return (
    <View styleName="ai-start">
      <Heading size={2}>Badges</Heading>
      <View styleName="flex-row ai-center">
        <Text styleName="mr-2">User Online:</Text>
        <Badge styleName="bg-primary">40</Badge>
      </View>
      <Badge color="danger">Deprecated color prop test</Badge>
    </View>
  );
}

export default SampleBadges;
