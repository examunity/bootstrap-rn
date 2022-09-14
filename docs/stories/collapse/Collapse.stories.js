import React from 'react';
import { View, Collapse, Card, Button, Text } from 'bootstrap-rn';

const CollapseMeta = {
  title: 'Collapse',
  component: Collapse,
  argTypes: {
    //
  },
};

export default CollapseMeta;

export function Basic() {
  return (
    <View styleName="align-items-center">
      <View styleName="flex-column">
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
      </View>
    </View>
  );
}
