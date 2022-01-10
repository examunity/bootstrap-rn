import React, { useState } from 'react';
import { Heading, Checkbox, Switch, Radio } from 'bootstyle';

function Forms() {
  const [value, setValue] = useState(false);
  const [radioValue, setRadioValue] = useState(1);

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
      <Switch
        value={value}
        onChange={() => {
          setValue((prev) => !prev);
        }}
      >
        Switch label
      </Switch>
      <Radio.Group
        value={radioValue}
        onChange={(next) => {
          setRadioValue(next);
        }}
      >
        <Radio value={1}>Test 1</Radio>
        <Radio value={2}>Test 2</Radio>
        <Radio value={3}>Test 3</Radio>
      </Radio.Group>
    </>
  );
}

export default Forms;
