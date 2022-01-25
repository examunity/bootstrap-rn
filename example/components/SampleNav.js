import React from 'react';
import { Nav, Heading } from 'bootstyle';

function SampleNav() {
  return (
    <>
      <Heading size={2}>Nav</Heading>
      <Nav variant="tabs" styleName="mb-3">
        <Nav.Link>Ron</Nav.Link>
        <Nav.Link>Patrik</Nav.Link>
        <Nav.Link>Anton</Nav.Link>
        <Nav.Link>Markus</Nav.Link>
        <Nav.Link active>active</Nav.Link>
        <Nav.Link disabled>disabled</Nav.Link>
      </Nav>
      <Nav variant="pills">
        <Nav.Link>Ron</Nav.Link>
        <Nav.Link>Patrik</Nav.Link>
        <Nav.Link>Anton</Nav.Link>
        <Nav.Link>Markus</Nav.Link>
        <Nav.Link active>active</Nav.Link>
        <Nav.Link disabled>disabled</Nav.Link>
      </Nav>
    </>
  );
}

export default SampleNav;
