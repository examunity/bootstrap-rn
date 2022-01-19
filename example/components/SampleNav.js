import React from 'react';
import { Nav, Container, Heading, Text } from 'bootstyle';

function SampleNav() {
  return (
    <>
      <Heading size={2}>Nav</Heading>
      <Nav>
        <Container fluid styleName="flex-row">
          <Nav.Link>Ron</Nav.Link>
          <Nav.Link>Patrick</Nav.Link>
          <Nav.Link>Anton</Nav.Link>
          <Nav.Link>Markus</Nav.Link>
          <Nav.Link active>active</Nav.Link>
          <Nav.Link disabled>disabled</Nav.Link>
          <Nav.Tab>tab</Nav.Tab>
          <Nav.Pill>pill</Nav.Pill>
        </Container>
      </Nav>
    </>
  );
}

export default SampleNav;
