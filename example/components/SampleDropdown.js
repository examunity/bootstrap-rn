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
      <Dropdown visible={dropdownVisible}>
        <Text>Dropdown Item 1</Text>
        <Text>Dropdown Item 2</Text>
        <Text>Dropdown Item 3</Text>
        <Text>Dropdown Item 4</Text>
      </Dropdown>
    </>
  );
}

export default SampleDropdowns;
