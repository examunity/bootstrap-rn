import React from 'react';
import { Button, Heading, Text } from 'bootstyle';

function SampleButtons() {
  return (
    <>
      <Heading size={2}>Buttons</Heading>
      <Button>
        <Text>Ron</Text>
      </Button>
      <Button color="secondary" outline styleName="mb-3">
        <Text>Markus</Text>
      </Button>
      <Button toggle={Button}>
        <Text>Toggle button</Text>
      </Button>
    </>
  );
}

export default SampleButtons;
