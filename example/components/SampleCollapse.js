import React from 'react';
import { Collapse, Heading, Text, Button, Card } from 'bootstyle';

function SampleCollpase() {
  const visible = false;
  return (
    <>
      <Heading size={2}>Collapse</Heading>
      <Collapse.Provider defaultVisible={visible}>
        <Button toggle={Collapse.toggle}>
          <Text>Collapse</Text>
        </Button>
        <Collapse>
          <Card>
            <Card.Body>
              <Text>Hello, I am collapsible</Text>
            </Card.Body>
          </Card>
        </Collapse>
      </Collapse.Provider>
    </>
  );
}

export default SampleCollpase;
