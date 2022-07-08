import React from 'react';
import { View, Text } from 'bootstrap-rn';

const ContentMeta = {
  title: 'Content',
  component: Content,
  argTypes: {
    //
  },
};

export default ContentMeta;

export function Basic(args) {
  return <View styleName="align-items-center"></View>;
}
