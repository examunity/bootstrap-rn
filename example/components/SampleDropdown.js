import React, { useState } from 'react';
import { Dropdown, Text, Heading, Button } from 'bootstyle';

function SampleDropdowns() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <Heading size={2}>Dropdown</Heading>
      <Button onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Text>Show Dropdown</Text>
      </Button>

      <Dropdown visible={dropdownVisible} placement="bottom">
        <Dropdown.Menu>
          <Dropdown.Item>Float 101</Dropdown.Item>
          <Dropdown.Item>Float 102</Dropdown.Item>
          <Dropdown.Item>Float 103</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SampleDropdowns;
