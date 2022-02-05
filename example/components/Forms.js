import React, { useState } from 'react';
import {
  Heading,
  View,
  Button,
  Text,
  Checkbox,
  Switch,
  Radio,
  Input,
  Picker,
  Label,
  FormText,
  Feedback,
} from 'bootstrap-rn';

function Forms() {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [text, onChangeText] = useState('Useless Text');
  const [selectedValue, onValueChange] = useState('');

  return (
    <>
      <Heading size={2}>Forms</Heading>
      <View styleName="w-100 as-center">
        <Checkbox
          value={value}
          onChange={() => {
            setValue((prev) => !prev);
          }}
          invalid={error}
        >
          Checkbox label
        </Checkbox>
        <Checkbox
          value={value}
          onChange={() => {
            setValue((prev) => !prev);
          }}
          invalid={error}
          disabled
        >
          Checkbox label
        </Checkbox>
        <Switch
          value={value}
          onChange={() => {
            setValue((prev) => !prev);
          }}
          invalid={error}
        >
          Switch label
        </Switch>
        <Radio.Group
          value={radioValue}
          onChange={(next) => {
            setRadioValue(next);
          }}
        >
          <Radio value={1} invalid={error}>
            Test 1
          </Radio>
          <Radio value={2} invalid={error}>
            Test 2
          </Radio>
          <Radio value={3} invalid={error}>
            Test 3
          </Radio>
        </Radio.Group>
        <Label styleName="mt-3">Test</Label>
        <Input
          placeholder="Hello!"
          value={text}
          onChangeText={onChangeText}
          invalid={error}
        />
        <FormText>Test</FormText>
        {error && (
          <Feedback type="invalid" styleName="mb-3">
            Error!
          </Feedback>
        )}
        <Input
          size="sm"
          value={text}
          onChangeText={onChangeText}
          invalid={error}
        />
        <Input
          size="lg"
          value={text}
          onChangeText={onChangeText}
          invalid={error}
        />
        <Input
          value={text}
          onChangeText={onChangeText}
          multiline
          numberOfLines={5}
          invalid={error}
          disabled
        />
        <Picker
          value={selectedValue}
          onChange={onValueChange}
          placeholder="Test"
          styleName="mt-3"
          invalid={error}
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
          invalid={error}
        >
          <Picker.Item label="Football" value="football" />
          <Picker.Item label="Baseball" value="baseball" />
          <Picker.Item label="Hockey" value="hockey" />
        </Picker>
        <Button
          onPress={() => {
            setError((v) => !v);
          }}
          styleName="mt-3"
        >
          <Text>Submit</Text>
        </Button>
      </View>
    </>
  );
}

export default Forms;
