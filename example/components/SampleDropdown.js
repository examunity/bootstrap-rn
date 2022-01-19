import React, { useState } from 'react';
import { Dropdown, Text, Heading, Button, View } from 'bootstyle';

function SampleDropdowns() {
  const [dropdownVisible, setDropdownVisible] = useState(true);

  return (
    <>
      <Heading size={2}>Dropdown</Heading>
      <Button onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Text>Show Dropdown</Text>
      </Button>

      <Dropdown visible={dropdownVisible} placement="bottom">
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
