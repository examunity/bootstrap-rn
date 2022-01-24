import React, { useState } from 'react';
import { Collapse, Heading, Text, Button, Card } from 'bootstyle';

function SampleCollpase() {
  const [collapseVisible, setCollapseVisible] = useState(false);

  return (
    <>
      <Heading size={2}>Collapse</Heading>
      <Button onPress={() => setCollapseVisible(!collapseVisible)}>
        <Text>Collapse Toggle</Text>
      </Button>

      <Collapse visible={collapseVisible}>
        <Card>
          <Card.Body>
            <Text>Hello, I am collapsible</Text>
          </Card.Body>
        </Card>
      </Collapse>

      <Collapse visible={collapseVisible}>
        <Card>
          <Card.Body>
            <Text>Hello, I am collapsible2</Text>
          </Card.Body>
        </Card>
      </Collapse>
    </>
  );
}

export default SampleCollpase;
