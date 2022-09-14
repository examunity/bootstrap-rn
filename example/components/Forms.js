import React, { useState } from 'react';
import {
  Heading,
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
  Container,
  Row,
  Col,
  Code,
  Card,
} from 'bootstrap-rn';

function Forms() {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(false);
  const [slider, setSlider] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [text, onChangeText] = useState('Form input text');
  const [selectedValue, onValueChange] = useState('');

  const cardmargin = 'mb-3';

  return (
    <>
      <Container styleName="my-3">
        <Row>
          <Col size={12}>
            <Heading size={4}>API</Heading>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">FormText </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
            <Code>
              <Text color="dark">import </Text>
              <Text color="primary">Checkbox </Text>
              <Text color="dark">from </Text>
              <Text color="primary">&apos;bootstrap-rn&apos;</Text>
            </Code>
          </Col>
        </Row>
      </Container>

      <Heading size={2}>Forms</Heading>
      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Checkbox</Heading>
        </Card.Header>
        <Card.Body>
          <Checkbox
            value={value}
            onChange={() => {
              setValue((prev) => !prev);
            }}
            invalid={error}
          >
            <Text>Checkbox label</Text>
          </Checkbox>
          <Checkbox
            value={value}
            onChange={() => {
              setValue((prev) => !prev);
            }}
            invalid={error}
            disabled
          >
            <Text>Checkbox label</Text>
          </Checkbox>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'const [value, setValue] = useState(false);\n'}
            {'...\n'}
            {'<Checkbox\n' +
              '  value={value}\n' +
              '  onChange={() => {setValue((prev) => !prev);}}\n' +
              '  invalid={error}\n' +
              '>\n' +
              '  <Text>Checkbox label</Text>\n' +
              '</Checkbox>\n' +
              '<Checkbox\n' +
              '  value={value}\n' +
              '  onChange={() => {setValue((prev) => !prev);}}\n' +
              '  invalid={error}\n' +
              '  disabled\n' +
              '>\n' +
              '  <Text>Checkbox label</Text>\n' +
              '</Checkbox>'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Switch</Heading>
        </Card.Header>
        <Card.Body>
          <Switch
            value={slider}
            onChange={() => {
              setSlider((prev) => !prev);
            }}
            invalid={error}
          >
            <Text>Switch label</Text>
          </Switch>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">
            {'const [slider, setSlider] = useState(false);\n'}
            {'...\n'}
            {'<Switch\n' +
              ' value={slider}\n' +
              ' onChange={() => {\n' +
              '   setSlider((prev) => !prev);\n' +
              ' }}\n' +
              ' invalid={error}\n' +
              '>\n' +
              '  <Text>Switch label</Text>\n' +
              '</Switch>'}
          </Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Radio Group</Heading>
        </Card.Header>
        <Card.Body>
          <Radio.Group
            value={radioValue}
            onChange={(next) => {
              setRadioValue(next);
            }}
          >
            <Radio value={1} invalid={error}>
              <Text>Test 1</Text>
            </Radio>
            <Radio value={2} invalid={error}>
              <Text>Test 2</Text>
            </Radio>
            <Radio value={3} invalid={error}>
              <Text>Test 3</Text>
            </Radio>
          </Radio.Group>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{'<Code>Code text ...</Code>\n'}</Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Form Input</Heading>
        </Card.Header>
        <Card.Body>
          <Label>
            Label Text<Text bold> (Input size Small sm)</Text>
          </Label>
          <Input
            size="sm"
            value={text}
            onChangeText={onChangeText}
            invalid={error}
          />

          <Label styleName="mt-3">
            Label Text <Text bold>(Input size Normal default)</Text>
          </Label>
          <Input
            placeholder="Hello!"
            value={text}
            onChangeText={onChangeText}
            invalid={error}
          />

          <Label styleName="mt-3">
            Label Text <Text bold>(Input size Large lg)</Text>
          </Label>
          <Input
            size="lg"
            value={text}
            onChangeText={onChangeText}
            invalid={error}
          />

          <FormText styleName="mt-3">FormText with error Feedback</FormText>
          {error && (
            <Feedback type="invalid" styleName="mb-3">
              Error!
            </Feedback>
          )}

          <Label styleName="mt-3">
            Label Text <Text bold>(Input as Textarea)</Text>
          </Label>
          <Input
            value={text}
            onChangeText={onChangeText}
            multiline
            numberOfLines={5}
            invalid={error}
          />
          <Button
            onPress={() => {
              setError((v) => !v);
            }}
            styleName="mt-3"
          >
            <Text>Submit</Text>
          </Button>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{'<Code>Code text ...</Code>\n'}</Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5}>Picker</Heading>
        </Card.Header>
        <Card.Body>
          <Picker
            value={selectedValue}
            onChange={onValueChange}
            placeholder="Test"
            invalid={error}
          >
            <Picker.Item label="Football" value="football" />
            <Picker.Item label="Baseball" value="baseball" />
            <Picker.Item label="Hockey" value="hockey" />
          </Picker>
          <Picker
            styleName="mt-3"
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
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{'<Code>Code text ...</Code>\n'}</Code>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Forms;
