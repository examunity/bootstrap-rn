import React from 'react';
import { Dropdown, Text, Heading, Button, View } from 'bootstyle';

function SampleDropdowns() {
  return (
    <>
      <Heading size={2}>Dropdown</Heading>
      <Dropdown placement="bottom">
        <Button onPress={Dropdown.toggle}>
          <Text>Show Dropdown</Text>
        </Button>
        <Dropdown.Menu>
          <Dropdown.Header>
            <Text>Dropdown header</Text>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>
            <View>
              <Text>Dropdown Item 101</Text>
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
    </>
  );
}

export default SampleDropdowns;
