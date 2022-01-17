import React, { useState } from 'react';
import {
  Heading,
  View,
  Checkbox,
  Switch,
  Radio,
  Input,
  Picker,
  Label,
  FormText,
  Feedback,
} from 'bootstyle';

function Forms() {
  const [value, setValue] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [text, onChangeText] = useState('Useless Text');
  const [selectedValue, onValueChange] = useState('');

  return (
    <>
      <Heading size={2}>Forms</Heading>
      <View>
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
        <Label styleName="mt-3">Test</Label>
        <Input value={text} onChangeText={onChangeText} />
        <FormText>Test</FormText>
        <Feedback type="invalid" styleName="mb-3">
          Error!
        </Feedback>
        <Input size="sm" value={text} onChangeText={onChangeText} />
        <Input size="lg" value={text} onChangeText={onChangeText} />
        <Input
          value={text}
          onChangeText={onChangeText}
          multiline
          numberOfLines={5}
        />
        <Picker
          value={selectedValue}
          onChange={onValueChange}
          placeholder="Test"
          styleName="mt-3"
        >
          <Picker.Item label="Football" value="football" />
          <Picker.Item label="Baseball" value="baseball" />
          <Picker.Item label="Hockey" value="hockey" />
        </Picker>
        <Picker
          value={selectedValue}
          onChange={onValueChange}
          placeholder="Test"
          useNativeComponent
        >
          <Picker.Item label="Football" value="football" />
          <Picker.Item label="Baseball" value="baseball" />
          <Picker.Item label="Hockey" value="hockey" />
        </Picker>
      </View>
    </>
  );
}

export default Forms;
