import React from 'react';
import { View, Breadcrumb, Text } from 'bootstrap-rn';

const BreadcrumbMeta = {
  title: 'Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    //
  },
};

export default BreadcrumbMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Text>Home</Text>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Text>Home</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Text>/</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <Text>Library</Text>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Text>Home</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Text>/</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Text>Library</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Text>/</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <Text>Data</Text>
        </Breadcrumb.Item>
      </Breadcrumb>
    </View>
  );
}
