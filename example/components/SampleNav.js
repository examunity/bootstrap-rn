import React from 'react';
import { Nav, Heading, Text } from 'bootstyle';

function SampleNav() {
  return (
    <>
      <Heading size={2}>Nav</Heading>
      <Nav>
        <Nav.Link>Ron</Nav.Link>
        <Nav.Link>Patrick</Nav.Link>
        <Nav.Link>Anton</Nav.Link>
        <Nav.Link>Markus</Nav.Link>
        <Nav.Link active>active</Nav.Link>
        <Nav.Link disabled>disabled</Nav.Link>
        <Nav.Tab>
          <Text>tab</Text>
        </Nav.Tab>
        <Nav.Pill>
          <Text>pill</Text>
        </Nav.Pill>
      </Nav>
    </>
  );
}

export default SampleNav;
