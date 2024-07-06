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
  FormLabel,
  FormText,
  Feedback,
  Container,
  Row,
  Col,
  Code,
  Card,
  FormCheck,
} from 'bootstrap-rn';

function Forms() {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(false);
  const [slider, setSlider] = useState(false);
  const [radioValue, setRadioValue] = useState<
    boolean | number | string | object | undefined
  >(1);
  const [text, onChangeText] = useState('Form input text');
  const [selectedValue, onValueChange] = useState();

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
          <Heading size={5} styleName="mb-0">
            Checkbox
          </Heading>
        </Card.Header>
        <Card.Body>
          <FormCheck invalid={error}>
            <Checkbox
              type="checkbox"
              value={value}
              onValueChange={() => {
                setValue((prev) => !prev);
              }}
            />
            <FormCheck.Label>
              <Text>Checkbox label</Text>
            </FormCheck.Label>
          </FormCheck>
          <FormCheck invalid={error} disabled>
            <Checkbox
              type="checkbox"
              value={value}
              onValueChange={() => {
                setValue((prev) => !prev);
              }}
            />
            <FormCheck.Label>
              <Text>Checkbox label</Text>
            </FormCheck.Label>
          </FormCheck>
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
          <Heading size={5} styleName="mb-0">
            Switch
          </Heading>
        </Card.Header>
        <Card.Body>
          <FormCheck invalid={error}>
            <Switch
              value={slider}
              onValueChange={() => {
                setSlider((prev) => !prev);
              }}
            />
            <FormCheck.Label>
              <Text>Switch label</Text>
            </FormCheck.Label>
          </FormCheck>
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
          <Heading size={5} styleName="mb-0">
            Radio Group
          </Heading>
        </Card.Header>
        <Card.Body>
          <Radio.Group
            selectedValue={radioValue}
            onValueChange={(next) => {
              setRadioValue(next);
            }}
          >
            <FormCheck invalid={error}>
              <Radio value={1} />
              <FormCheck.Label>
                <Text>Test 1</Text>
              </FormCheck.Label>
            </FormCheck>
            <FormCheck invalid={error}>
              <Radio value={2} />
              <FormCheck.Label>
                <Text>Test 2</Text>
              </FormCheck.Label>
            </FormCheck>
            <FormCheck invalid={error}>
              <Radio value={3} />
              <FormCheck.Label>
                <Text>Test 3</Text>
              </FormCheck.Label>
            </FormCheck>
          </Radio.Group>
        </Card.Body>
        <Card.Footer styleName="bg-dark">
          <Code styleName="text-warning">{'<Code>Code text ...</Code>\n'}</Code>
        </Card.Footer>
      </Card>

      <Card styleName={cardmargin}>
        <Card.Header>
          <Heading size={5} styleName="mb-0">
            Form Input
          </Heading>
        </Card.Header>
        <Card.Body>
          <FormLabel>
            <Text>
              Label Text <Text bold>(Input size small sm)</Text>
            </Text>
          </FormLabel>
          <Input
            size="sm"
            value={text}
            onChangeText={onChangeText}
            invalid={error}
          />

          <FormLabel styleName="mt-3">
            <Text>
              Label Text <Text bold>(Input size normal default)</Text>
            </Text>
          </FormLabel>
          <Input
            placeholder="Hello!"
            value={text}
            onChangeText={onChangeText}
            invalid={error}
          />

          <FormLabel styleName="mt-3">
            <Text>
              Label Text <Text bold>(Input size large lg)</Text>
            </Text>
          </FormLabel>
          <Input
            size="lg"
            value={text}
            onChangeText={onChangeText}
            invalid={error}
          />

          <FormText>FormText with error Feedback</FormText>
          {error && (
            <Feedback type="invalid" styleName="mb-3">
              Error!
            </Feedback>
          )}

          <FormLabel styleName="mt-3">
            <Text>
              Label Text <Text bold>(Input as textarea)</Text>
            </Text>
          </FormLabel>
          <Input
            value={text}
            onChangeText={onChangeText}
            multiline
            rows={5}
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
          <Heading size={5} styleName="mb-0">
            Picker
          </Heading>
        </Card.Header>
        <Card.Body>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            placeholder="Test"
            invalid={error}
          >
            <Picker.Item label="Football" value="football" />
            <Picker.Item label="Baseball" value="baseball" />
            <Picker.Item label="Hockey" value="hockey" />
          </Picker>
          <Picker
            styleName="mt-3"
            selectedValue={selectedValue}
            onValueChange={onValueChange}
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
