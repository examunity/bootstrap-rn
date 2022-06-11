import React from 'react';
import { Paragraph, Text, Card, Container, Row, Col, Code } from 'bootstrap-rn';
import Form from '../forms/Form';

const exampleCode = '<>\n  </>';

function FormikForms() {
  const options = [
    { value: '001', label: 'Bulbasaur' },
    { value: '004', label: 'Charmander' },
    { value: '007', label: 'Squirtle' },
  ];

  return (
    <>
      <Card styleName="mb-3">
        <Card.Header>
          <Text>Form components</Text>
        </Card.Header>
        <Card.Body>
          <Paragraph>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet.
          </Paragraph>
          <Form
            initialValues={{
              input: 'Dinofi',
              passwordInput: null,
              multilineInput: null,
              picker: null,
              choice: null,
              multipleChoice: [],
              checkbox: false,
            }}
            onSubmit={(values, { setSubmitting }) => {
              // eslint-disable-next-line no-console
              console.log(values);

              setSubmitting(false);
            }}
          >
            <Form.Input
              name="input"
              title="Test <Form.Input />"
              placeholder="Type..."
              info="This is an info text to describe the form element"
            />
            <Form.Input
              type="password"
              name="passwordInput"
              title="Test <Form.Input /> (type -> password)"
            />
            <Form.Input
              name="multilineInput"
              title="Test <Form.Input /> (multiline)"
              multiline
            />
            <Form.Picker
              name="picker"
              title="Test <Form.Picker />"
              placeholder="Pick an option..."
              options={options}
            />
            <Form.Choice
              title="Test <Form.Choice />"
              name="choice"
              options={options}
            />
            <Form.Choice
              name="multipleChoice"
              title="Test <Form.Choice /> (multiple)"
              options={options}
              multiple
            />
            <Form.Checkbox
              name="checkbox"
              title="Test <Form.Checkbox />"
              label="I agree with aaaaall da rules"
            />
            <Form.Button type="submit" styleName="mb-3">
              <Text>Submit</Text>
            </Form.Button>
            <Form.Button type="reset">
              <Text>Reset</Text>
            </Form.Button>
          </Form>
        </Card.Body>
      </Card>
      <Card styleName="mb-3">
        <Card.Header>
          <Text>Small/Large form components</Text>
        </Card.Header>
        <Card.Body>
          <Form
            initialValues={{
              smallInput: null,
              largeInput: null,
            }}
            onSubmit={(values, { setSubmitting }) => {
              // eslint-disable-next-line no-console
              console.log(values);

              setSubmitting(false);
            }}
          >
            <Form.Input
              name="smallInput"
              title="Test small <Form.Input />"
              placeholder="Type..."
              size="sm"
            />
            <Form.Input
              name="largeInput"
              title="Test large <Form.Input />"
              placeholder="Type..."
              size="lg"
            />
            <Form.Button type="submit" size="sm">
              <Text>Submit</Text>
            </Form.Button>
          </Form>
        </Card.Body>
      </Card>

      <Container styleName="bg-dark mt-3">
        <Row>
          <Col size={12}>
            <Code styleName="text-warning">{exampleCode}</Code>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormikForms;
