import React from 'react';
import { Collapse, Heading, Text, Button, Card } from 'bootstyle';

function SampleCollapse() {
  return (
    <>
      <Heading size={2}>Collapse</Heading>
      <Collapse.Provider>
        <Button toggle={Collapse}>
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

export default SampleCollapse;
