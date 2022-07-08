import React from 'react';
import { View, Card, Heading, Text } from 'bootstrap-rn';

const CardnMeta = {
  title: 'Card',
  component: Card,
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
        'link',
      ],
      control: { type: 'select' },
    },
  },
};

export default CardnMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Card>
        <Card.Header>
          <Text>Card Header Text</Text>
        </Card.Header>
        <Card.Body>
          <Text>Body Text</Text>
        </Card.Body>
        <Card.Footer>
          <Text>Card Footer Text</Text>
        </Card.Footer>
      </Card>
    </View>
  );
}

export function Sizes(args) {
  return (
    <View styleName="align-items-center">
      <Card {...args} size="sm" styleName="mb-3">
        <Text>Button</Text>
      </Card>
      <Card {...args} size="lg">
        <Text>Button</Text>
      </Card>
    </View>
  );
}
