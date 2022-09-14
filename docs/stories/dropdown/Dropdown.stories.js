import React from 'react';
import { View, Dropdown, Button, Text } from 'bootstrap-rn';

const DropdownMeta = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    //
  },
};

export default DropdownMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
      <Dropdown direction="bottom" styleName="mb-3">
        <Dropdown.Toggle>
          {(toggleProps) => (
            <Button {...toggleProps} styleName="">
              <Text>Show Dropdown</Text>
            </Button>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header>
            <Text>Dropdown header</Text>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item active disabled>
            <View>
              <Text>Dropdown Item 101</Text>
            </View>
          </Dropdown.Item>
          <Dropdown.Item active>
            <View>
              <Text>Dropdown Item 102</Text>
            </View>
          </Dropdown.Item>
          <Dropdown.ItemText>Dropdown Item Text 101</Dropdown.ItemText>
          <Dropdown.Item>
            <View>
              <Text>Dropdown Item 201</Text>
            </View>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown direction="bottom">
        <Button toggle={Dropdown} styleName="">
          <Text>Show Dropdown</Text>
        </Button>
        <Dropdown.Menu>
          <Dropdown.Header>
            <Text>Dropdown header</Text>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item active disabled>
            <View>
              <Text>Dropdown Item 101</Text>
            </View>
          </Dropdown.Item>
          <Dropdown.Item active>
            <View>
              <Text>Dropdown Item 102</Text>
            </View>
          </Dropdown.Item>
          <Dropdown.ItemText>Dropdown Item Text 101</Dropdown.ItemText>
          <Dropdown.Item>
            <View>
              <Text>Dropdown Item 201</Text>
            </View>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </View>
  );
}
