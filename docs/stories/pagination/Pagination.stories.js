import React from 'react';
import { View, Pagination, Text } from 'bootstrap-rn';

const PaginationMeta = {
  title: 'Pagination',
  component: Pagination,
  argTypes: {
    //
  },
};

export default PaginationMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
      <Pagination>
        <Pagination.Item>
          <Text>Previous</Text>
        </Pagination.Item>
        <Pagination.Item>
          <Text>1</Text>
        </Pagination.Item>
        <Pagination.Item>
          <Text>2</Text>
        </Pagination.Item>
        <Pagination.Item>
          <Text>3</Text>
        </Pagination.Item>
        <Pagination.Item>
          <Text>Next</Text>
        </Pagination.Item>
      </Pagination>
    </View>
  );
}
