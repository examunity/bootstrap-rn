import React from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Heading,
  Text,
} from 'bootstrap-native';

function SampleButtonGroup() {
  return (
    <>
      <Heading size={2}>Button group</Heading>
      <ButtonGroup styleName="mb-3">
        <Button>
          <Text>Ron</Text>
        </Button>
        <Button active>
          <Text>Anton</Text>
        </Button>
        <Button color="secondary" outline>
          <Text>Markus</Text>
        </Button>
      </ButtonGroup>
      <ButtonToolbar>
        <ButtonGroup styleName="mr-2">
          <Button>
            <Text>1</Text>
          </Button>
          <Button active>
            <Text>2</Text>
          </Button>
          <Button color="secondary" outline>
            <Text>3</Text>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="danger">
            <Text>1</Text>
          </Button>
          <Button color="danger">
            <Text>2</Text>
          </Button>
          <Button color="danger" outline>
            <Text>3</Text>
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

export default SampleButtonGroup;
