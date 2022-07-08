import React from 'react';
import { View, Nav, Tab, Text } from 'bootstrap-rn';

const NavMeta = {
  title: 'Nav',
  component: Nav,
  argTypes: {
    //
  },
};

export default NavMeta;

export function Basic(args) {
  return (
    <View styleName="align-items-center">
      <Nav variant="tabs" styleName="mb-3">
        <Nav.Link>
          <Text>Ron</Text>
        </Nav.Link>
        <Nav.Link>
          <Text>Patrik</Text>
        </Nav.Link>
        <Nav.Link>
          <Text>Anton</Text>
        </Nav.Link>
        <Nav.Link>
          <Text>Markus</Text>
        </Nav.Link>
        <Nav.Link active>
          <Text>active</Text>
        </Nav.Link>
        <Nav.Link disabled>
          <Text>disabled</Text>
        </Nav.Link>
      </Nav>
    </View>
  );
}
