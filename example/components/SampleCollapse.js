import React from 'react';
import { Collapse, Heading, Text, View, Button, Card } from 'bootstyle';

function SampleCollapse() {
  return (
    <View styleName="ai-center">
      <Heading size={2}>Collapse</Heading>
      <Collapse.Provider>
        <Button onPress={Collapse.toggle}>
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
    </View>
  );
}

export default SampleCollapse;
