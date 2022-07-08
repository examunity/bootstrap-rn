import React from 'react';
import { View, ButtonGroup, Button, Text } from 'bootstrap-rn';

const ButtonGroupMeta = {
  title: 'ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    //
  },
};

export default ButtonGroupMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <View styleName="flex-row">
        <ButtonGroup styleName="mb-3">
          <Button>
            <Text>Ron</Text>
          </Button>
          <Button active>
            <Text>Anton</Text>
          </Button>
          <Button color="secondary" outline>
            <Text>Markus</Text>
          </Button>
        </ButtonGroup>
      </View>
    </View>
  );
}
