import React, { useState } from 'react';
import { Heading, Checkbox } from 'bootstyle';

function Forms() {
  const [value, setValue] = useState(false);

  return (
    <>
      <Heading size={2}>Forms</Heading>
      <Checkbox
        value={value}
        onChange={() => {
          setValue((prev) => !prev);
        }}
      >
        Checkbox label
      </Checkbox>
    </>
  );
}

export default Forms;
